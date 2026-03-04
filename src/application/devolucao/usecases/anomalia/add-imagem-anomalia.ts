import { Inject } from '@nestjs/common';
import { type IAnomaliaDevolucaoRepository } from '../../../../domain/devolucao/repositories/anomalia.repository.js';

export class AddImagemAnomalia {
  constructor(
    @Inject('IAnomaliaDevolucaoRepository')
    private readonly anomaliaRepository: IAnomaliaDevolucaoRepository,
  ) {}
  async execute(demandaId: string, imagem: string): Promise<void> {
    await this.anomaliaRepository.addUrlToAnomalia(demandaId, imagem);
  }
}
