import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':id/messages')
  findAllMessages(@Param('id') id: string) {
    return this.chatService.findAllMessages(+id);
  }
}
