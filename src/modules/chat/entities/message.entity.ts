import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@prisma/client';

export class MessageEntity implements Message {
  constructor(partial: Partial<MessageEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  chat_id: number;

  @ApiProperty()
  sender_id: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  sent_at: Date;
}
