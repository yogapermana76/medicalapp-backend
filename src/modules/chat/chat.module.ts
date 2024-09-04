import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
  imports: [PrismaModule],
  exports: [ChatService],
})
export class ChatModule {}
