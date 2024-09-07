import { Post, Body, Get, Param, Controller, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Response, ResponseStatusCode, User } from 'src/decorators';
import { ResponseService } from '../response/response.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChatEntity } from './entities/chat.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IUserData } from '../auth/interfaces';

@Controller('/')
@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ResponseStatusCode()
export class ChatController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly chatService: ChatService,
  ) {}

  @Post('/chats')
  @ApiCreatedResponse({ type: ChatEntity })
  async createChat(@Body() createChatDto: CreateChatDto) {
    try {
      const data = await this.chatService.createChat(createChatDto);
      return this.responseService.success('success create chat', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get('/chats')
  async findAllChatsByUser(@User() user: IUserData) {
    try {
      const data = await this.chatService.findAllChatsByUser(user.id);
      return this.responseService.success('success get chats', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Post('/messages')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    try {
      const data = await this.chatService.createMessage(createMessageDto);
      return this.responseService.success('success create message', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get('/messages/:chatId')
  async findMessages(@Param('chatId') chatId: number) {
    try {
      const data = await this.chatService.findMessages(chatId);
      return this.responseService.success('success get messages', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
