import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  doctor_id: number;
}
