import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Sse,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { SearchDto } from '../common/dto/search.dto';
import { Observable, filter, fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsEmitter: EventEmitter2,
    private readonly eventsService: EventsService,
  ) {}

  @Sse()
  sse(@Param() projectId: string): Observable<MessageEvent> {
    console.log('here');
    return fromEvent(this.eventsEmitter, `event.**`).pipe(
      filter((event: any) => {
        console.log(event);
        return event.recipient === projectId;
      }),
      map((event) => {
        console.log(event);
        return new MessageEvent(`event`, {
          data: event,
        });
      }),
    );
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.eventsService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
