import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Not, Repository } from 'typeorm';
import { Role } from './entities/enum/role.enum';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

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
