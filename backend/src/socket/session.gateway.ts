import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { QrService } from '../qr/qr.service';
import { verifyDesktopAuth } from './ws-auth.util';

interface BeatEvent {
  band: 'bass' | 'mid' | 'high';
  level: number;
}
interface TrackInfo {
  title: string;
  artist?: string;
}

type ClientRole = 'desktop' | 'phone';
interface SocketData {
  role?: ClientRole;
  token?: string;
}

/* Room = QRSession.token. Desktop нь JWT-ээр баталгаажина, phone нь QR endpoint-тэй ижил
   @Public() зарчмаар (token л хангалттай) нэгддэг. */
@WebSocketGateway({ cors: { origin: true, credentials: true } })
export class SessionGateway implements OnGatewayDisconnect {
  private readonly logger = new Logger(SessionGateway.name);

  @WebSocketServer() server!: Server;

  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private qr: QrService,
  ) {}

  @SubscribeMessage('desktop:create-session')
  async onDesktopCreateSession(@ConnectedSocket() client: Socket, @MessageBody() body: { token: string }) {
    const user = await verifyDesktopAuth(client, this.jwt, this.config);
    if (!user) return { ok: false, error: 'unauthorized' };

    const session = await this.qr.get(body.token).catch(() => null);
    if (!session || session.userId !== user.userId) return { ok: false, error: 'not-found' };

    (client.data as SocketData).role = 'desktop';
    (client.data as SocketData).token = body.token;
    client.join(body.token);
    return { ok: true };
  }

  @SubscribeMessage('phone:join')
  async onPhoneJoin(@ConnectedSocket() client: Socket, @MessageBody() body: { token: string }) {
    const session = await this.qr.get(body.token).catch(() => null);
    if (!session) return { ok: false, error: 'not-found' };
    if (session.status === 'EXPIRED') return { ok: false, error: 'expired' };

    if (session.status === 'PENDING') {
      await this.qr.connect(body.token);
    }

    (client.data as SocketData).role = 'phone';
    (client.data as SocketData).token = body.token;
    client.join(body.token);
    client.to(body.token).emit('phone:connected', {});
    return { ok: true, status: 'CONNECTED' };
  }

  @SubscribeMessage('desktop:beat')
  onBeat(@ConnectedSocket() client: Socket, @MessageBody() body: BeatEvent) {
    const data = client.data as SocketData;
    if (data.role !== 'desktop' || !data.token) return;
    client.to(data.token).emit('session:beat', body);
  }

  @SubscribeMessage('desktop:track-changed')
  onTrackChanged(@ConnectedSocket() client: Socket, @MessageBody() body: TrackInfo) {
    const data = client.data as SocketData;
    if (data.role !== 'desktop' || !data.token) return;
    client.to(data.token).emit('session:track', body);
  }

  handleDisconnect(client: Socket) {
    const data = client.data as SocketData;
    if (!data?.token) return;
    const event = data.role === 'phone' ? 'phone:disconnected' : 'desktop:disconnected';
    this.server.to(data.token).emit(event, {});
    this.logger.debug(`${data.role ?? 'unknown'} disconnected from session ${data.token}`);
  }
}
