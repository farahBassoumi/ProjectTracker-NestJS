import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';

@Injectable()
export class InvitationsService extends CrudService<Invitation> {
  constructor(
    @InjectRepository(Invitation)
    invitationsRepository: Repository<Invitation>,
  ) {
    super(invitationsRepository);
  }
}
