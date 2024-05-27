import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
