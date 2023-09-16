import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { SocketAuthMiddleware } from 'src/auth/guards/ws.middleware';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';

@WebSocketGateway({
  cors: true,
})
@UseGuards(WsJwtGuard)
export class MessagesGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
    console.log('start');
  }

  @SubscribeMessage('connect')
  test(@MessageBody() body: any) {
    this.server.emit('message', { name: 'yu are great' });
  }

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    console.log(createMessageDto);
    const message = this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = this.messagesService.getClientName(client.id);
    client.broadcast.emit('isTyping', { name, isTyping });
  }
}
