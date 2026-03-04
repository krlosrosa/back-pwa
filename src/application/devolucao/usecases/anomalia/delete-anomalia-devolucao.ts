import { Inject } from '@nestjs/common';
import { type IAnomaliaDevolucaoRepository } from '../../../../domain/devolucao/repositories/anomalia.repository.js';

export class DeleteAnomaliaDevolucao {
  constructor(
    @Inject('IAnomaliaDevolucaoRepository')
    private readonly devolucaoRepository: IAnomaliaDevolucaoRepository,
  ) {}
  async execute(anomaliaId: string): Promise<void> {
    await this.devolucaoRepository.removeAnomalia(anomaliaId);
  }
}
