import { Body, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { AddNewDemand } from '../../../../application/devolucao/usecases/demanda/add-new-demand.js';
import { AccountId } from '../../../../main/decorators/account-id.decorator.js';
import { DemandDto } from '../../../../domain/devolucao/model/demanda-retorno.schema.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddNewDemandController {
  constructor(private readonly addNewDemandUseCase: AddNewDemand) {}

  @Post('add-demanda/:centerId')
  @ApiOperation({
    summary: 'Adicionar demanda',
    operationId: 'addDemandaDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda adicionada com sucesso',
    type: String,
  })
  @ApiBody({ type: DemandDto })
  @ApiResponse({
    status: 200,
    description: 'Demanda adicionada com sucesso',
    type: String,
  })
  async addDemanda(
    @Body() addDemandaDto: DemandDto,
    @Param('centerId') centerId: string,
    @AccountId() accountId: string,
  ): Promise<string> {
    return this.addNewDemandUseCase.execute(addDemandaDto, centerId, accountId);
  }
}
