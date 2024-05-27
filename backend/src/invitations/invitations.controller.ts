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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationType } from 'src/notifications/enum/notification-type.enum';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(
    @Body() createInvitationDto: CreateInvitationDto,
    @User() user: UserEntity,
  ) {
    createInvitationDto.sender = user;

    const { id } = await this.invitationsService.create(createInvitationDto);

    const invitation = await this.invitationsService.findOne(id, {
      sender: true,
      receiver: true,
      team: {
        project: true,
      },
    });

    this.eventEmitter.emit(NotificationType.projectInvitation, {
      user: invitation.receiver,
      type: NotificationType.projectInvitation,
      data: invitation,
    } as CreateNotificationDto);

    return invitation;
  }

  @Get()
  findAllByUser(@Query() searchDto: SearchDto, @User() user: UserEntity) {
    return this.invitationsService.findAllByUser(searchDto, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(id, {
      receiver: true,
      sender: true,
      team: {
        project: true,
      },
    });
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
