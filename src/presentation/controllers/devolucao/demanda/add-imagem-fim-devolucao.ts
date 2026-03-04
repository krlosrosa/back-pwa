import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AddImagemFimDevolucao } from '../../../../application/devolucao/usecases/demanda/add-imagem-fim-devolucao.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddImagemFimDevolucaoController {
  constructor(
    private readonly addImagemFimDevolucaoUseCase: AddImagemFimDevolucao,
  ) {}
  @Post('add-imagem-fim/:demandaId')
  @ApiOperation({
    summary: 'Adicionar imagem de fim de devolução',
    operationId: 'addImagemFimDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagem de fim de devolução adicionada com sucesso',
  })
  async addImagemFim(
    @Param('demandaId') demandaId: string,
    @Body() imagens: string[],
  ): Promise<void> {
    return this.addImagemFimDevolucaoUseCase.execute(imagens, demandaId);
  }
}
