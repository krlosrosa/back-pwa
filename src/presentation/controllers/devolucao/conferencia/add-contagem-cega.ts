import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AddContagemCegaUseCase } from '../../../../application/devolucao/usecases/conferencia/add-contagem-cega.js';
import { AddConferenciaCegaDto } from '../../../../domain/devolucao/model/add-contagem.schema.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddContagemCegaController {
  constructor(
    private readonly addContagemCegaUseCase: AddContagemCegaUseCase,
  ) {}

  @Post('add-contagem-cega/:demandaId')
  @ApiOperation({
    summary: 'Iniciar conferência',
    operationId: 'addContagemCega',
  })
  @ApiResponse({
    status: 200,
    description: 'Conferência iniciada com sucesso',
  })
  @ApiBody({ type: [AddConferenciaCegaDto] })
  async addContagemCega(
    @Param('demandaId') demandaId: string,
    @Body() conferencia: AddConferenciaCegaDto[],
  ): Promise<void> {
    return this.addContagemCegaUseCase.execute(demandaId, conferencia);
  }
}
