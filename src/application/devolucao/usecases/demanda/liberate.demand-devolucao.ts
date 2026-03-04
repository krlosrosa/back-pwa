import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class LiberateDemandDevolucao {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(demandaId: string): Promise<void> {
    await this.devolucaoRepository.liberateDemand(demandaId);
  }
}
