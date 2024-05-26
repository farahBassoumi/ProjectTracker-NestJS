import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { InvitationsModule } from 'src/invitations/invitations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), InvitationsModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
