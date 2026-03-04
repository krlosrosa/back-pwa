import { Injectable, Inject } from '@nestjs/common';
import { type IRavexRepository } from './ravex.repository.js';

@Injectable()
export class RavexAuthService {
  constructor(
    @Inject('IRavexRepository')
    private readonly ravexRepository: IRavexRepository,
  ) {}

  async getToken(): Promise<string> {
    const auth = await this.ravexRepository.authRavex();
    return auth?.access_token ?? '';
  }
}
