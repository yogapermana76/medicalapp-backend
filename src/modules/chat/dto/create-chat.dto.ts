import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  doctor_id: number;
}
