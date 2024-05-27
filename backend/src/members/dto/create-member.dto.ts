import { IsNotEmpty, Matches, ValidateNested } from 'class-validator';
import { Role } from '../enum/role.enum';
import { Type } from 'class-transformer';
import { EntityDto } from 'src/common/dto/entity.dto';

export class CreateMemberDto {
  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  team: EntityDto;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  user: EntityDto;

  @Matches(
    `^${Object.values(Role)
      .filter((value) => value != Role.Leader)
      .join('|')}$`,
    'i',
  )
  role: Role;
}
