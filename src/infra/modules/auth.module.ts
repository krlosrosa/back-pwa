import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../application/auth/usecases/jwt.strategy.js';
import { drizzleProvider } from '../db/drizzle/config/drizzle.provider.js';
import { usecasesAuth } from '../../application/auth/usecases/index.js';
import { UserDrizzleRepository } from '../db/user.db.js';
import { controllersAuth } from '../../presentation/controllers/auth/index.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [...controllersAuth],
  providers: [
    drizzleProvider,
    ...usecasesAuth,
    JwtStrategy,
    {
      provide: 'IUserRepository',
      useClass: UserDrizzleRepository,
    },
  ],
})
export class AuthModule {}
