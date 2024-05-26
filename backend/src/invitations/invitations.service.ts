import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Member } from 'src/teams/entities/member.entity';
import { InvitationStatus } from './enum/invitation-status.enum';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { SearchDto } from 'src/common/dto/search.dto';

@Injectable()
export class InvitationsService extends CrudService<Invitation> {
  constructor(
    @InjectRepository(Invitation)
    invitationsRepository: Repository<Invitation>,
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
      },
      {
        receiver: true,
        sender: true,
        team: true,
      },
    );
  }

  create(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    const lifetime = 7;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + lifetime);

    createInvitationDto.expirationDate = expirationDate;

    return super.create(createInvitationDto);
  }

  async findInvitationsByUserId(userId: string): Promise<Invitation[]> {
    const invitations = await this.repository.find();

    return invitations.filter((invitation) => {
      invitation.receiver.id == userId;
    });
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
