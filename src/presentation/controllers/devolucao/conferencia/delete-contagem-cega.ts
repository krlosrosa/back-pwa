import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { DeleteContagemCegaUseCase } from '../../../../application/devolucao/usecases/conferencia/delete-contagem-cega.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class DeleteContagemCegaController {
  constructor(
    private readonly deleteContagemCegaUseCase: DeleteContagemCegaUseCase,
  ) {}

  @Post('delete-contagem-cega/:uuid')
  @ApiOperation({
    summary: 'Deletar contagem cega',
    operationId: 'deleteContagemCega',
  })
  @ApiResponse({
    status: 200,
    description: 'Contagem cega deletada com sucesso',
  })
  async deleteContagemCega(@Param('uuid') uuid: string): Promise<void> {
    return this.deleteContagemCegaUseCase.execute(uuid);
  }
}
