import { Controller, Get, Param, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SearchDto } from '../common/dto/search.dto';
import { User as UserDecorator } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.notificationsService.findAll(searchDto);
  }
  @Get('user/:id')
  findAllByUserId(@UserDecorator() user: User, @Query() searchDto: SearchDto) {
    return this.notificationsService.findAll(searchDto, { user: user });
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }
}
