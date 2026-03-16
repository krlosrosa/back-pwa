import { Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';
import { ListDemandOpen } from '../../../../application/devolucao/usecases/demanda/list-demand-open.js';
import { AccountId } from '../../../../main/decorators/account-id.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class ListDemandOpenController {
  constructor(private readonly listDemandOpenUseCase: ListDemandOpen) {}

  @Get('listar-demandas-em-aberto/:centerId')
  @ApiOperation({
    summary: 'Listar demandas em aberto',
    operationId: 'listarDemandasEmAbertoDevolucaoMobile',
  })
  @ApiResponse({
    status: 200,
    description: 'Demandas em aberto listadas com sucesso',
    type: [DemandDto],
  })
  async listarDemandasEmAberto(
    @Param('centerId') centerId: string,
    @AccountId() accountId: string,
  ): Promise<DemandDto[]> {
    const demandas = await this.listDemandOpenUseCase.execute(
      centerId,
      accountId,
    );
    console.log(demandas);
    return demandas;
  }
}
