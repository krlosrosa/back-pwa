import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class StartDemandaDevolucao {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(
    demandaId: string,
    doca: string,
    accountId: string,
  ): Promise<void> {
    await this.devolucaoRepository.startDemanda(demandaId, doca, accountId);
  }
}
