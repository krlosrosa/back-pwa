import { Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { AddImagemAnomalia } from '../../../../application/devolucao/usecases/anomalia/add-imagem-anomalia.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const AddImagemAnomaliaBodySchema = z.object({
  image: z.string(),
});

export class AddImagemAnomaliaBodyDto extends createZodDto(
  AddImagemAnomaliaBodySchema,
) {}

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddImagemAnomaliaController {
  constructor(private readonly addImagemAnomaliaUseCase: AddImagemAnomalia) {}
  @Post('add-imagem-anomalia/:demandaId')
  @ApiOperation({
    summary: 'Adicionar imagem de anomalia',
    operationId: 'addImagemAnomalia',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagem de anomalia adicionada com sucesso',
  })
  @ApiBody({ type: AddImagemAnomaliaBodyDto })
  async addImagemAnomalia(
    @Param('demandaId') demandaId: string,
    @Body() imagem: AddImagemAnomaliaBodyDto,
  ): Promise<void> {
    return this.addImagemAnomaliaUseCase.execute(demandaId, imagem.image);
  }
}
