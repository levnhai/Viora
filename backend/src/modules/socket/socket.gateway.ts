import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
@Injectable()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Socket connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Socket disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-wedding')
  handleJoinWedding(
    @ConnectedSocket() client: Socket,
    @MessageBody() slug: string,
  ) {
    if (!slug) return;
    console.log(`Socket ${client.id} joining wedding room: ${slug}`);
    client.join(slug);
  }

  notifyWeddingUpdate(slug: string, eventType: 'guestbook-updated' | 'guests-updated' | 'wedding-updated') {
    if (this.server) {
      console.log(`Emitting ${eventType} to wedding room: ${slug}`);
      this.server.to(slug).emit(eventType, { slug });
    }
  }
}
