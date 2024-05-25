import { IsNotEmpty, IsUUID } from 'class-validator';

export class EntityDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
