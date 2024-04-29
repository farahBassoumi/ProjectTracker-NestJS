import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService extends CrudService<Comment> {
  constructor(
    @InjectRepository(Comment)
    cvsRepository: Repository<Comment>,
  ) {
    super(cvsRepository);
  }
}
