import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SearchDto } from '../common/dto/search.dto';
import { User } from 'src/auth/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: UserEntity) {
    createCommentDto.user = user;

    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.commentsService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() user: UserEntity,
  ) {
    if (!(await this.isOwner(id, user))) {
      throw new ForbiddenException();
    }

    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    if (!(await this.isOwner(id, user))) {
      throw new ForbiddenException();
    }

    return this.commentsService.remove(id);
  }

  async isOwner(id: string, user: UserEntity): Promise<boolean> {
    const comment = await this.commentsService.findOne(id, { user: true });

    if (!comment) {
      throw new NotFoundException();
    }

    return comment.user.id == user.id;
  }
}
