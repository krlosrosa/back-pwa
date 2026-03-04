import { Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { LiberateDemandDevolucao } from '../../../../application/devolucao/usecases/demanda/liberate.demand-devolucao.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class LiberateDemandDevolucaoController {
  constructor(
    private readonly liberateDemandDevolucaoUseCase: LiberateDemandDevolucao,
  ) {}
  @Post('liberar-demanda/:demandaId')
  @ApiOperation({
    summary: 'Liberar demanda para conferência',
    operationId: 'liberarDemandaDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda liberada para conferência com sucesso',
    type: String,
  })
  async liberarDemanda(@Param('demandaId') demandaId: string): Promise<void> {
    return this.liberateDemandDevolucaoUseCase.execute(demandaId);
  }
}
