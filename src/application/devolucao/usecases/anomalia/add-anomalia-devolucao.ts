import { Inject } from '@nestjs/common';
import { AddAnomaliaDto } from '../../../../domain/devolucao/model/add-anomalia.schema.js';
import { type IAnomaliaDevolucaoRepository } from '../../../../domain/devolucao/repositories/anomalia.repository.js';

export class AddAnomaliaDevolucao {
  constructor(
    @Inject('IAnomaliaDevolucaoRepository')
    private readonly anomaliaRepository: IAnomaliaDevolucaoRepository,
  ) {}
  async execute(anomalia: AddAnomaliaDto): Promise<void> {
    await this.anomaliaRepository.addAnomalia(anomalia);
  }
}
