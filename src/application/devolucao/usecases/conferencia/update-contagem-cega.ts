import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';
import { AddConferenciaCegaDto } from '../../../../domain/devolucao/model/add-contagem.schema.js';
export class UpdateContagemCegaUseCase {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(
    uuid: string,
    contagem: Partial<AddConferenciaCegaDto>,
  ): Promise<void> {
    await this.devolucaoRepository.updateContagemCega(uuid, contagem);
  }
}
