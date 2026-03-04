import { Inject } from '@nestjs/common';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';
import { AddNotaDto } from '../../../../domain/devolucao/model/add-nota.schema.js';

export default class AddNfInDemand {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}

  async execute(addNotaDto: AddNotaDto): Promise<void> {
    await this.devolucaoRepository.addNfInDemand(addNotaDto);
  }
}
