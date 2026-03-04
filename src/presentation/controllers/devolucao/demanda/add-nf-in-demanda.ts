import { Body, Post } from '@nestjs/common';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddNotaDto } from '../../../../domain/devolucao/model/add-nota.schema.js';
import AddNfInDemand from '../../../../application/devolucao/usecases/demanda/add-nf-in-demand.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddNfInDemandaController {
  constructor(private readonly addNfInDemandUseCase: AddNfInDemand) {}
  @Post('add-nota')
  @ApiOperation({
    summary: 'Adicionar nota de devolução',
    operationId: 'addNotaDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Nota de devolução adicionada com sucesso',
    type: String,
  })
  @ApiBody({ type: AddNotaDto })
  async addNota(@Body() addNotaDto: AddNotaDto): Promise<void> {
    return this.addNfInDemandUseCase.execute(addNotaDto);
  }
}
