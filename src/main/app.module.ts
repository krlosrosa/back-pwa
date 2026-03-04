import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DevolucaoModule } from '../infra/modules/devolucao.module.js';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../infra/modules/user.module.js';
import { MinioModule } from '../infra/minio/minio.module.js';
import { ProdutoModule } from '../infra/modules/produto.module.js';
import { AuthModule } from '../infra/modules/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente
      envFilePath: '.env', // Especifica o caminho do arquivo .env
    }),
    JwtModule.register({
      global: true,
      publicKey: `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`, //join(process.cwd(), 'src/auth/keys/public.pem'),
    }),
    DevolucaoModule,
    UserModule,
    MinioModule,
    ProdutoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
