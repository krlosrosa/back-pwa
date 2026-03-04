import { AddAnomaliaDevolucao } from '../../../../application/devolucao/usecases/anomalia/add-anomalia-devolucao.js';
import { AddAnomaliaDto } from '../../../../domain/devolucao/model/add-anomalia.schema.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Body } from '@nestjs/common';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddAnomaliaDevolucaoController {
  constructor(
    private readonly addAnomaliaDevolucaoUseCase: AddAnomaliaDevolucao,
  ) {}

  @Post('add-anomalia-devolucao')
  @ApiOperation({
    summary: 'Adicionar anomalia de devolução',
    operationId: 'addAnomaliaDevolucao',
  })
  @ApiBody({ type: AddAnomaliaDto })
  @ApiResponse({
    status: 200,
    description: 'Anomalia de devolução adicionada com sucesso',
  })
  async addAnomaliaDevolucao(@Body() anomalia: AddAnomaliaDto): Promise<void> {
    return this.addAnomaliaDevolucaoUseCase.execute(anomalia);
  }
}
