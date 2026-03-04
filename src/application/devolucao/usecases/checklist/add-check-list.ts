import { Inject } from '@nestjs/common';
import { AddCheckListDto } from '../../../../domain/devolucao/model/add-check-list.schema.js';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

export class AddCheckListDemand {
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}
  async execute(checkList: AddCheckListDto, demandaId: string): Promise<void> {
    return this.devolucaoRepository.addCheckList(checkList, demandaId);
  }
}
