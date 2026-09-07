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

@WebSocketGateway({ cors: { origin: true, credentials: true } })
@Injectable()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly socketVisitors = new Map<string, string>();

  getOnlineCount(): number {
    return new Set(this.socketVisitors.values()).size;
  }

  handleConnection(_client: Socket) {}

  handleDisconnect(client: Socket) {
    if (this.socketVisitors.delete(client.id)) this.broadcastOnlineCount();
  }

  private broadcastOnlineCount() {
    this.server?.to('admin-stats').emit('online-users-count', {
      count: this.getOnlineCount(),
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('identify-visitor')
  handleIdentifyVisitor(
    @ConnectedSocket() client: Socket,
    @MessageBody() visitorId: string,
  ) {
    if (!visitorId || visitorId.length > 128) return;
    const previousCount = this.getOnlineCount();
    this.socketVisitors.set(client.id, visitorId);
    if (this.getOnlineCount() !== previousCount) this.broadcastOnlineCount();
  }

  @SubscribeMessage('join-admin-stats')
  handleJoinAdminStats(@ConnectedSocket() client: Socket) {
    client.join('admin-stats');
    client.emit('online-users-count', {
      count: this.getOnlineCount(),
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('join-wedding')
  handleJoinWedding(
    @ConnectedSocket() client: Socket,
    @MessageBody() slug: string,
  ) {
    if (slug) client.join(slug);
  }

  notifyWeddingUpdate(
    slug: string,
    eventType: 'guestbook-updated' | 'guests-updated' | 'wedding-updated',
  ) {
    this.server?.to(slug).emit(eventType, { slug });
  }
}
