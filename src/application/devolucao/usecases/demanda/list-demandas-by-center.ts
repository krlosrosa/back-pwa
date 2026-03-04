import { Inject } from '@nestjs/common';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class ListDemandasByCenter {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(centerId: string, data: string): Promise<DemandDto[]> {
    const demandas = await this.devolucaoRepository.findDemandasByCenterId(
      centerId,
      data,
    );
    if (!demandas) {
      throw new Error('Demandas não encontradas');
    }
    return demandas;
  }
}
