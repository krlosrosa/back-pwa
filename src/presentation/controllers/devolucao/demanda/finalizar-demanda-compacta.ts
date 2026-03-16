import { Body, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { FinalizarDemandaCompactaUseCase } from '../../../../application/devolucao/usecases/demanda/finalizar-demanda-compacta.js';
import { DemandCompactDto } from '../../../../domain/devolucao/model/get-demanda-compact.schema.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao', isPublic: true })
export class FinalizarDemandaCompactaController {
  constructor(private readonly useCase: FinalizarDemandaCompactaUseCase) {}

  @Put('compact/:id')
  @ApiOperation({
    summary: 'Sincroniza e finaliza os dados de uma demanda de devolução',
    operationId: 'finalizarDemandaCompacta',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda sincronizada com sucesso',
  })
  async execute(
    @Param('id') id: string,
    @Body() demanda: DemandCompactDto,
  ): Promise<void> {
    return this.useCase.execute(id, demanda);
  }
}
