import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    const { user_id, doctor_id } = createChatDto;

    if (user_id === doctor_id) {
      throw new Error('User cannot chat with themselves ');
    }

    const isUserFound = await this.prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!isUserFound) {
      throw new Error('User not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: +doctor_id },
      include: { doctor: true },
    });

    const doctor = await this.prisma.doctor.findUnique({
      where: { id: user.doctor.id },
    });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const isChatExists = await this.prisma.chat.findFirst({
      where: {
        OR: [
          {
            user_id,
            doctor_id: doctor.id,
          },
          {
            user_id: doctor.id,
            doctor_id: user_id,
          },
        ],
      },
    });

    if (isChatExists) {
      return isChatExists;
    }

    return await this.prisma.chat.create({
      data: {
        user_id,
        doctor_id: doctor.id,
      },
    });
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: createMessageDto.chat_id },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    const message = await this.prisma.message.create({
      data: createMessageDto,
    });

    delete message.id;

    return message;
  }

  async findMessages(chat_id: number) {
    return await this.prisma.message.findMany({
      where: { chat_id: +chat_id },
      orderBy: { sent_at: 'asc' },
    });
  }

  async findAllChatsByUser(user_id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { user_id: +user_id },
    });

    if (doctor) {
      return this.prisma.chat.findMany({
        where: { doctor_id: doctor.id },
      });
    }

    return this.prisma.chat.findMany({
      where: { user_id: +user_id },
    });
  }
}
