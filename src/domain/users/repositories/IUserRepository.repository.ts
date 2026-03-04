import { InfoMeDto } from '../model/info-me.schema.js';
import { UserDto } from '../model/user.schema.js';

export interface IUserRepository {
  getInfoMe(userId: string): Promise<InfoMeDto>;
  getUserById(userId: string): Promise<UserDto>;
}
