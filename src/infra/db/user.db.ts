import { DRIZZLE_PROVIDER } from './drizzle/config/drizzle.constat.js';
import { Injectable, Inject } from '@nestjs/common';
import { type DrizzleClient } from './drizzle/config/drizzle.provider.js';
import { IUserRepository } from '../../domain/users/repositories/IUserRepository.repository.js';
import { user, userCenter } from './drizzle/config/migrations/schema.js';
import { eq } from 'drizzle-orm';
import { InfoMeDto } from '../../domain/users/model/info-me.schema.js';
import { UserDto } from '../../domain/users/model/user.schema.js';

@Injectable()
export class UserDrizzleRepository implements IUserRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  async getInfoMe(accountId: string): Promise<InfoMeDto> {
    const userCenters = await this.db
      .select({
        userId: userCenter.userId,
        roles: userCenter.roles,
        name: user.name,
        centerId: userCenter.centerId,
        empresa: user.empresa,
      })
      .from(userCenter)
      .leftJoin(user, eq(user.id, userCenter.userId))
      .where(eq(userCenter.userId, accountId));

    if (!userCenters.length) {
      throw new Error('Usuário não encontrado');
    }

    // 2️⃣ Pega o id e name do primeiro registro
    const { userId, name, empresa } = userCenters[0];

    // 3️⃣ Achata todos os arrays de roles e remove duplicatas
    const rolesWithCenter = userCenters.flatMap((uc) =>
      (uc.roles ?? []).map((role) => `${role}:${uc.centerId}`),
    );
    const uniqueRoles = [...new Set(rolesWithCenter.filter(Boolean))];

    // 4️⃣ Retorna no formato do DTO
    const dataResult = {
      id: userId,
      name: name as string,
      roles: uniqueRoles,
      empresa: empresa as 'LDB' | 'ITB' | 'DPA',
    };
    return dataResult;
  }

  async getUserById(userId: string): Promise<UserDto> {
    const userData = await this.db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!userData.length) {
      throw new Error('Usuário não encontrado');
    }

    const infoUser = userData[0];
    return {
      ...infoUser,
      nome: infoUser.name,
      primeiroNome: infoUser.name.split(' ')[0],
      ultimoNome: infoUser.name.split(' ').slice(1).join(' '),
      turno: infoUser.turno,
      empresa: infoUser.empresa as 'LDB' | 'ITB' | 'DPA',
      credencial: infoUser.password as string,
      centerId: infoUser.centerId,
      id: infoUser.id,
    };
  }
}
