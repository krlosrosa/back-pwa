import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class AddUrlToDemanda {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(
    demandaId: string,
    processo: string,
    tag: string,
  ): Promise<void> {
    await this.devolucaoRepository.addUrlToDemanda(demandaId, processo, tag);
  }
}
