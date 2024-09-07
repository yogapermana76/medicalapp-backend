import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  chat_id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  sender_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
