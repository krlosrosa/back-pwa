import { Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetResultadoDemanda } from '../../../../application/devolucao/usecases/demanda/get-result-demand.js';
import { ResultadoDemandaDto } from '../../../../domain/devolucao/model/resultado.schema.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class GetResultDemandByIdController {
  constructor(
    private readonly getResultDemandByIdUseCase: GetResultadoDemanda,
  ) {}

  @Get('get-resultado-demanda/:id')
  @ApiOperation({
    summary: 'Buscar resultado de demanda de devolução',
    operationId: 'getResultadoDemandaDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Resultado de demanda de devolução encontrado com sucesso',
    type: ResultadoDemandaDto,
  })
  async getResultadoDemanda(
    @Param('id') id: string,
  ): Promise<ResultadoDemandaDto> {
    return this.getResultDemandByIdUseCase.execute(Number(id));
  }
}
