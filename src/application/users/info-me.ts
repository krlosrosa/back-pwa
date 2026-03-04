import { Inject } from '@nestjs/common';
import { InfoMeDto } from '../../domain/users/model/info-me.schema.js';
import { type IUserRepository } from '../../domain/users/repositories/IUserRepository.repository.js';

export class GetInfoMe {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(userId: string): Promise<InfoMeDto> {
    return this.userRepository.getInfoMe(userId);
  }
}
