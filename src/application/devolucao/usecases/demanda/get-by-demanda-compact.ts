import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';
import { DemandCompactDto } from '../../../../domain/devolucao/model/get-demanda-compact.schema.js';

@Injectable()
export class GetByDemandaCompactUseCase {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}

  async execute(demandaId: string): Promise<DemandCompactDto> {
    const result = await this.devolucaoRepository.findDemandaCompact(
      Number(demandaId),
    );
    if (!result) {
      throw new NotFoundException('Demanda não encontrada');
    }
    return result;
  }
}
