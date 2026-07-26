import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionGateway } from './session.gateway';
import { QrModule } from '../qr/qr.module';

@Module({
  imports: [JwtModule.register({}), QrModule],
  providers: [SessionGateway],
})
export class SocketModule {}
