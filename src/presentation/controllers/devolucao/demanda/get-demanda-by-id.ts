import { Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { GetDemandaById } from '../../../../application/devolucao/usecases/demanda/get-demanda-by-id.js';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class GetDemandaByIdController {
  constructor(private readonly getResultDemandByIdUseCase: GetDemandaById) {}
  @Get('get-demanda-by-id/:id')
  @ApiOperation({
    summary: 'Buscar demanda de devolução por ID',
    operationId: 'getDemandaByIdDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda de devolução encontrada com sucesso',
    type: DemandDto,
  })
  async getDemandaById(@Param('id') id: string): Promise<DemandDto> {
    return this.getResultDemandByIdUseCase.execute(id);
  }
}
