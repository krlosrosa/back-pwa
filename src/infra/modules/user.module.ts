import { Module } from '@nestjs/common';
import { InfoMeController } from '../../presentation/controllers/user/info-me.js';
import { drizzleProvider } from '../db/drizzle/config/drizzle.provider.js';
import { GetInfoMe } from '../../application/users/info-me.js';
import { UserDrizzleRepository } from '../db/user.db.js';

@Module({
  controllers: [InfoMeController],
  providers: [
    drizzleProvider, // Provider do Drizzle ORM
    GetInfoMe,
    {
      provide: 'IUserRepository', // Interface no Domain
      useClass: UserDrizzleRepository, // Implementação na Infra
    },
  ],
})
export class UserModule {}
