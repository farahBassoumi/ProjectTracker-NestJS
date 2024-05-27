import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MembersController } from './members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MembersService],
  exports: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
