import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { GetAnomaliasByDemandaDto } from '../../../../domain/devolucao/model/get-anomalias-by-demanda.schema.js';
import { GetAnomaliasByDemanda } from '../../../../application/devolucao/usecases/anomalia/get-anomalias-by-demanda.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class GetAnomaliasByDemandaController {
  constructor(
    private readonly getAnomaliasByDemandaUseCase: GetAnomaliasByDemanda,
  ) {}
  @Get('get-anomalias-by-demanda/:demandaId')
  @ApiOperation({
    summary: 'Buscar anomalias por demanda',
    operationId: 'getAnomaliasByDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Anomalias encontradas com sucesso',
    type: [GetAnomaliasByDemandaDto],
  })
  async getAnomaliasByDemanda(
    @Param('demandaId') demandaId: string,
  ): Promise<GetAnomaliasByDemandaDto[]> {
    return this.getAnomaliasByDemandaUseCase.execute(demandaId);
  }
}
