import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AddConferenciaCegaDto } from '../../../../domain/devolucao/model/add-contagem.schema.js';
import { AddContagemCegaIndividual } from '../../../../application/devolucao/usecases/conferencia/add-contagem-cega-individual.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddContagemCegaIndividualController {
  constructor(
    private readonly addContagemCegaIndividualUseCase: AddContagemCegaIndividual,
  ) {}

  @Post('add-contagem-cega-individual/:demandaId')
  @ApiOperation({
    summary: 'Iniciar conferência',
    operationId: 'addContagemCegaIndividual',
  })
  @ApiResponse({
    status: 200,
    description: 'Conferência iniciada com sucesso',
  })
  @ApiBody({ type: AddConferenciaCegaDto })
  async addContagemCegaIndividual(
    @Param('demandaId') demandaId: string,
    @Body() conferencia: AddConferenciaCegaDto,
  ): Promise<void> {
    return this.addContagemCegaIndividualUseCase.execute(
      demandaId,
      conferencia,
    );
  }
}
