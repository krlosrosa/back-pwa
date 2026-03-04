import { Inject } from '@nestjs/common';
import { AddConferenciaCegaDto } from '../../../../domain/devolucao/model/add-contagem.schema.js';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class AddContagemCegaUseCase {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(
    demandaId: string,
    contagem: AddConferenciaCegaDto[],
  ): Promise<void> {
    return await this.devolucaoRepository.addContagemCega(demandaId, contagem);
  }
}
