import { Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { ListDemandasByCenter } from '../../../../application/devolucao/usecases/demanda/list-demandas-by-center.js';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class ListDemandasByCenterAndDataController {
  constructor(
    private readonly listDemandasByCenterAndDataUseCase: ListDemandasByCenter,
  ) {}

  @Get('listar-demandas/:centerId/:data')
  @ApiOperation({
    summary: 'Listar demandas de devolução',
    operationId: 'listarDemandasDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Demandas de devolução listadas com sucesso',
    type: [DemandDto],
  })
  async listDemandas(
    @Param('centerId') centerId: string,
    @Param('data') data: string,
  ): Promise<DemandDto[]> {
    return this.listDemandasByCenterAndDataUseCase.execute(centerId, data);
  }
}
