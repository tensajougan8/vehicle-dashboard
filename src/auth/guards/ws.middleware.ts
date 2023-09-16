import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';
import { UsersService } from 'src/users/users.service';

export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return (client, next) => {
    try {
      Logger.log('test');
      WsJwtGuard.validateToken(client);
      UsersService
      next();
    } catch (error) {
      next(error);
    }
  };
};
