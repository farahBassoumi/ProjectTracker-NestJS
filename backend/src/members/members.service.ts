import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { DeleteResult, Not, Repository } from 'typeorm';
import { Role } from './enum/role.enum';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto): Promise<Member> {
    const entity = this.membersRepository.create(createMemberDto);

    return this.membersRepository.save(entity);
  }

  async update(
    teamId: string,
    userId: string,
    { role }: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.membersRepository.findOneBy({ teamId, userId });

    if (!member) {
      throw new NotFoundException();
    }

    member.role = role;

    return this.membersRepository.save(member);
  }

  async remove(teamId: string, userId: string): Promise<DeleteResult> {
    const result = await this.membersRepository.delete({ teamId, userId });

    if (!result.affected) {
      throw new NotFoundException();
    }

    return result;
  }

  hasRole(teamId: string, userId: string, role?: Role): Promise<boolean> {
    switch (role) {
      case Role.Leader:
        return this.isLeader(teamId, userId);

      case Role.SubLeader:
        return this.isSubLeader(teamId, userId);

      case Role.Member:
        return this.isMember(teamId, userId);

      default:
        return Promise.resolve(true);
    }
  }

  private isLeader(teamId: string, userId: string): Promise<boolean> {
    return this.membersRepository.exists({
      where: {
        teamId,
        userId,
        role: Role.Leader,
      },
    });
  }

  private isSubLeader(teamId: string, userId: string): Promise<boolean> {
    return this.membersRepository.exists({
      where: {
        teamId,
        userId,
        role: Not(Role.Member),
      },
    });
  }

  private isMember(teamId: string, userId: string): Promise<boolean> {
    return this.membersRepository.exists({
      where: {
        teamId,
        userId,
      },
    });
  }
}
