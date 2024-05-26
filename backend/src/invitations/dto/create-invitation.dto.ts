import { Type } from 'class-transformer';
import { EntityDto } from '../../common/dto/entity.dto';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateInvitationDto {
  sender: User;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  receiver: EntityDto;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  team: EntityDto;

  expirationDate: Date;
}
