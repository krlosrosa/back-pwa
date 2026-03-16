import { Injectable, Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';
import { DemandCompactDto } from '../../../../domain/devolucao/model/get-demanda-compact.schema.js';

@Injectable()
export class FinalizarDemandaCompactaUseCase {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}

  async execute(demandaId: string, demanda: DemandCompactDto): Promise<void> {
    await this.devolucaoRepository.finalizarDemandaCompacta(
      Number(demandaId),
      demanda,
    );
  }
}
