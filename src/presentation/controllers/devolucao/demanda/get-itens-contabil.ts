import { Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ItensContabilDto } from '../../../../domain/devolucao/model/get-itens-contabil.schema.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { GetItensContabil } from '../../../../application/devolucao/usecases/demanda/get-itens-contabil.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class GetItensContabilController {
  constructor(private readonly getItensContabilUseCase: GetItensContabil) {}
  @Get('get-itens-contabil/:demandaId')
  @ApiOperation({
    summary: 'Listar itens contabilizados',
    operationId: 'getItensContabilDevolucaoMobile',
  })
  @ApiResponse({
    status: 200,
    description: 'Itens contabilizados listados com sucesso',
    type: [ItensContabilDto],
  })
  async getItensContabilizados(
    @Param('demandaId') demandaId: string,
  ): Promise<ItensContabilDto[]> {
    return this.getItensContabilUseCase.execute(demandaId);
  }
}
