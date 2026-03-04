import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class AddImagemFimDevolucao {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(imagens: string[], demandaId: string): Promise<void> {
    await this.devolucaoRepository.addImagemFim(imagens, demandaId);
  }
}
