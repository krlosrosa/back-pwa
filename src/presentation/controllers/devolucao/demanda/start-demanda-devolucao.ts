import { Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { StartDemandaDevolucao } from '../../../../application/devolucao/usecases/demanda/start-demanda-devolucao.js';
import { AccountId } from '../../../../main/decorators/account-id.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class StartDemandaDevolucaoController {
  constructor(
    private readonly startDemandaDevolucaoUseCase: StartDemandaDevolucao,
  ) {}
  @Post('start-demanda/:demandaId/:doca')
  @ApiOperation({
    summary: 'Iniciar conferência',
    operationId: 'startDemandaDevolucaoMobile',
  })
  @ApiResponse({
    status: 200,
    description: 'Conferência iniciada com sucesso',
    type: String,
  })
  async startDemanda(
    @Param('demandaId') demandaId: string,
    @Param('doca') doca: string,
    @AccountId() accountId: string,
  ): Promise<void> {
    return this.startDemandaDevolucaoUseCase.execute(
      demandaId,
      doca,
      accountId,
    );
  }
}
