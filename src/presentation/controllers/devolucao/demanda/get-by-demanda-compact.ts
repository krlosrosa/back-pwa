import { Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { GetByDemandaCompactUseCase } from '../../../../application/devolucao/usecases/demanda/get-by-demanda-compact.js';
import { DemandCompactDto } from '../../../../domain/devolucao/model/get-demanda-compact.schema.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao', isPublic: true })
export class GetByDemandaCompactController {
  constructor(private readonly useCase: GetByDemandaCompactUseCase) {}

  @Get('compact/:id')
  @ApiOperation({
    summary: 'Buscar dados compactos de uma demanda de devolução',
    operationId: 'getByDemandaCompact',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados compactos da demanda retornados com sucesso',
    type: DemandCompactDto,
  })
  async execute(@Param('id') id: string): Promise<DemandCompactDto> {
    return this.useCase.execute(id);
  }
}
