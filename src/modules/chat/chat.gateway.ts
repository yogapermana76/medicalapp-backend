import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.createMessage(createMessageDto);
    this.server
      .to(`chat_${createMessageDto.chat_id}`)
      .emit('messageReceived', message);
    return message;
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody('chat_id') chat_id: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`chat_${chat_id}`);
    console.log(`Client ${client.id} joined chat_${chat_id}`);
  }

  @SubscribeMessage('leaveChat')
  handleLeaveChat(
    @MessageBody('chat_id') chat_id: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`chat_${chat_id}`);
    console.log(`Client ${client.id} left chat_${chat_id}`);
  }
}
