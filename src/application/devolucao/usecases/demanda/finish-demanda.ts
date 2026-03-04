import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class FinishDemanda {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(demandaId: string): Promise<void> {
    return this.devolucaoRepository.finishDemanda(demandaId);
  }
}
