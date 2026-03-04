import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { DeleteAnomaliaDevolucao } from '../../../../application/devolucao/usecases/anomalia/delete-anomalia-devolucao.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class DeleteAnomaliaDevolucaoController {
  constructor(
    private readonly deleteAnomaliaDevolucaoUseCase: DeleteAnomaliaDevolucao,
  ) {}

  @Post('delete-anomalia-devolucao/:anomaliaId')
  @ApiOperation({
    summary: 'Deletar anomalia de devolução',
    operationId: 'deleteAnomaliaDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Anomalia de devolução deletada com sucesso',
  })
  async deleteAnomaliaDevolucao(
    @Param('anomaliaId') anomaliaId: string,
  ): Promise<void> {
    return this.deleteAnomaliaDevolucaoUseCase.execute(anomaliaId);
  }
}
