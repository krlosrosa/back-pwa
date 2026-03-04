import { Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FinishDemanda } from '../../../../application/devolucao/usecases/demanda/finish-demanda.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class FinishDemandaController {
  constructor(private readonly finishDemandaUseCase: FinishDemanda) {}

  @Post('finalizar-demanda/:demandaId')
  @ApiOperation({
    summary: 'Finalizar demanda',
    operationId: 'finalizarDemandaDevolucaoMobile',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda finalizada com sucesso',
  })
  async finalizarDemanda(@Param('demandaId') demandaId: string): Promise<void> {
    return this.finishDemandaUseCase.execute(demandaId);
  }
}
