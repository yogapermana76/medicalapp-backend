import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    return this.prisma.chat.create({
      data: createChatDto,
    });
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const { chat_id, sender_id, message } = createMessageDto;
    return this.prisma.message.create({
      data: {
        chat_id,
        sender_id,
        message,
      },
      include: {
        chat: true,
        sender: true,
      },
    });
  }

  async findAllMessages(chat_id: number) {
    return this.prisma.message.findMany({
      where: { chat_id },
      orderBy: { sent_at: 'asc' },
      include: {
        chat: true,
        sender: true,
      },
    });
  }
}
