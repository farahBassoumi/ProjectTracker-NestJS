import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Patch(':teamId/:userId')
  update(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(teamId, userId, updateMemberDto);
  }

  @Delete(':teamId/:userId')
  remove(@Param('teamId') teamId: string, @Param('userId') userId: string) {
    return this.membersService.remove(teamId, userId);
  }
}
