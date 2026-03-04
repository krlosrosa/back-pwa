import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';
import { Inject } from '@nestjs/common';
import { GetItensDemandaDto } from '../../../../domain/devolucao/model/get-itens.demanda.schema.js';

export class GetItensByDemandaId {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(demandaId: string): Promise<GetItensDemandaDto[]> {
    return this.devolucaoRepository.findItensByDemandaId(Number(demandaId));
  }
}
