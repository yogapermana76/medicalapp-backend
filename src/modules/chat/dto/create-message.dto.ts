import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  chat_id: number;

  @IsInt()
  @IsNotEmpty()
  sender_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
