import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';
import { GetAnomaliasByDemandaDto } from '../../../../domain/devolucao/model/get-anomalias-by-demanda.schema.js';

export class GetAnomaliasByDemanda {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(demandaId: string): Promise<GetAnomaliasByDemandaDto[]> {
    const anomalias = await this.devolucaoRepository.findAnomaliasByDemandaId(
      Number(demandaId),
    );
    return anomalias;
  }
}
