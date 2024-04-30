import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { SearchDto } from '../common/dto/search.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  create(@Body() createInvitationDto: CreateInvitationDto) {
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ) {
    return this.invitationsService.update(id, updateInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(id);
  }
}
