import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { GetItensDemandaDto } from '../../../../domain/devolucao/model/get-itens.demanda.schema.js';
import { Get, Param } from '@nestjs/common';
import { GetItensByDemandaId } from '../../../../application/devolucao/usecases/demanda/get-itens-by-demandaId.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class GetItemByDemandaIdController {
  constructor(
    private readonly getItemByDemandaIdUseCase: GetItensByDemandaId,
  ) {}
  @Get('get-itens-by-demanda-id/:demandaId')
  @ApiOperation({
    summary: 'Listar itens da demanda',
    operationId: 'getItensByDemandaIdDevolucaoMobile',
  })
  @ApiResponse({
    status: 200,
    description: 'Itens da demanda listados com sucesso',
    type: [GetItensDemandaDto],
  })
  async getItemByDemandaId(
    @Param('demandaId') demandaId: string,
  ): Promise<GetItensDemandaDto[]> {
    return this.getItemByDemandaIdUseCase.execute(demandaId);
  }
}
