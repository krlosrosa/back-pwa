import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { UpdateContagemCegaUseCase } from '../../../../application/devolucao/usecases/conferencia/update-contagem-cega.js';
import { AddConferenciaCegaDto } from '../../../../domain/devolucao/model/add-contagem.schema.js';
import { Body } from '@nestjs/common';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class UpdateContagemCegaController {
  constructor(
    private readonly updateContagemCegaUseCase: UpdateContagemCegaUseCase,
  ) {}

  @Post('update-contagem-cega/:uuid')
  @ApiOperation({
    summary: 'Atualizar contagem cega',
    operationId: 'updateContagemCega',
  })
  @ApiResponse({
    status: 200,
    description: 'Contagem cega atualizada com sucesso',
  })
  @ApiBody({ type: AddConferenciaCegaDto })
  async updateContagemCega(
    @Param('uuid') uuid: string,
    @Body() contagem: Partial<AddConferenciaCegaDto>,
  ): Promise<void> {
    return this.updateContagemCegaUseCase.execute(uuid, contagem);
  }
}
