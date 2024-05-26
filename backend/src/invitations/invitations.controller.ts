import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { SearchDto } from '../common/dto/search.dto';
import { User } from 'src/auth/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  create(
    @Body() createInvitationDto: CreateInvitationDto,
    @User() user: UserEntity,
  ) {
    createInvitationDto.sender = user;

    return this.invitationsService.create(createInvitationDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.invitationsService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(id);
  }

  @Get('invitationsByUserId/:id')
  userInvitation(@Param('id') id: string) {
    return this.invitationsService.findInvitationsByUserId(id);
  }

  @Post(':id/respond')
  async respond(
    @Param('id') id: string,
    @Body() updateInvitationDto: UpdateInvitationDto,
    @User() user: UserEntity,
  ) {
    const invitation = await this.invitationsService.findOne(id, {
      receiver: true,
    });

    if (invitation.receiver.id != user.id) {
      throw new ForbiddenException();
    }

    if (invitation.expirationDate < new Date()) {
      throw new ConflictException();
    }

    await this.invitationsService.respond(id, updateInvitationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    const invitation = await this.invitationsService.findOne(id, {
      sender: true,
    });

    if (invitation.sender.id != user.id) {
      throw new ForbiddenException();
    }

    return this.invitationsService.remove(id);
  }
}
function userInvitation(arg0: any, id: any, string: any) {
  throw new Error('Function not implemented.');
}

