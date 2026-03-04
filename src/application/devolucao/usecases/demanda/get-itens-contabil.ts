import { Inject } from '@nestjs/common';
import { ItensContabilDto } from '../../../../domain/devolucao/model/get-itens-contabil.schema.js';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class GetItensContabil {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(demandaId: string): Promise<ItensContabilDto[]> {
    return this.devolucaoRepository.getItensContabil(demandaId);
  }
}
