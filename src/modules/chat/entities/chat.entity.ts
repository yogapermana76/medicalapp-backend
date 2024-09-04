import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '@prisma/client';

export class ChatEntity implements Chat {
  constructor(partial: Partial<ChatEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  doctor_id: number;

  @ApiProperty()
  created_at: Date;
}
