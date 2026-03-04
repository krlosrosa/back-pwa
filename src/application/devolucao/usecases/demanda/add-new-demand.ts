import { Inject } from '@nestjs/common';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class AddNewDemand {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(
    demand: DemandDto,
    centerId: string,
    adicionadoPorId: string,
  ): Promise<string> {
    const demandId = await this.devolucaoRepository.create(
      demand,
      centerId,
      adicionadoPorId,
    );
    if (!demandId) {
      throw new Error('Erro ao criar demanda');
    }
    return demandId;
  }
}
