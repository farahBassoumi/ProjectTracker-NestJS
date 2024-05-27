import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Member } from 'src/members/entities/member.entity';
import { InvitationStatus } from './enum/invitation-status.enum';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { SearchDto } from 'src/common/dto/search.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvitationsService extends CrudService<Invitation> {
  constructor(
    @InjectRepository(Invitation)
    invitationsRepository: Repository<Invitation>,
    private readonly usersService: UsersService,
  ) {
    super(invitationsRepository);
  }

  findAllByUser(
    searchDto: SearchDto,
    userId: string,
  ): Promise<Pagination<Invitation>> {
    return super.findAll(
      searchDto,
      {
        receiver: { id: userId },
        status: InvitationStatus.Pending,
      },
      {
        receiver: true,
        sender: true,
        team: {
          project: true,
        },
      },
    );
  }

  async create(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    const lifetime = 7;

    const receiver = await this.usersService.findOneByEmail(
      createInvitationDto.receiver.email,
    );

    if (!receiver) {
      throw new NotFoundException();
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + lifetime);

    const creationData: DeepPartial<Invitation> = {
      ...createInvitationDto,
      receiver,
      expirationDate,
    };

    return super.create(creationData);
  }

  async respond(id: string, updateInvitationDto: UpdateInvitationDto) {
    const invitation = await this.findOne(id, {
      receiver: true,
      team: true,
    });

    invitation.status = updateInvitationDto.status;

    await this.repository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(invitation);

        if (invitation.status !== InvitationStatus.Accepted) {
          return;
        }

        const member = transactionalEntityManager.create(Member, {
          user: invitation.receiver,
          team: invitation.team,
        });

        await transactionalEntityManager.save(member);
      },
    );
  }
}
