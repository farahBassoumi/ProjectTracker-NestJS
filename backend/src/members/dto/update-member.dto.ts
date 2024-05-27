import { PickType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends PickType(CreateMemberDto, ['role']) {}
