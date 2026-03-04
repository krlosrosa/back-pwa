import { Inject } from '@nestjs/common';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class ListDemandOpen {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(centerId: string, accountId: string): Promise<DemandDto[]> {
    return this.devolucaoRepository.findDemandasOpen(centerId, accountId);
  }
}
