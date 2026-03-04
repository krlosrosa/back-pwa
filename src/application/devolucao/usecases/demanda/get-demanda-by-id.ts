import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';

export class GetDemandaById {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}

  async execute(demandaId: string): Promise<DemandDto> {
    const devolucao = await this.devolucaoRepository.findById(
      Number(demandaId),
    );
    if (!devolucao) {
      throw new Error('Demanda não encontrada');
    }
    return devolucao;
  }
}
