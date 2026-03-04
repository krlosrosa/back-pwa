import { Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { AddUrlToDemanda } from '../../../../application/devolucao/usecases/demanda/addUrlToDemanda.js';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const AddImangesCheckListBodySchema = z.object({
  image: z.string(),
});

export class AddImangesCheckListBodyDto extends createZodDto(
  AddImangesCheckListBodySchema,
) {}

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class AddImangesCheckListController {
  constructor(private readonly addUrlToDemandaUseCase: AddUrlToDemanda) {}
  @Post('add-imanges-check-list/:demandaId/:processo')
  @ApiOperation({
    summary: 'Adicionar imagens de check list',
    operationId: 'addImangesCheckList',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagens de check list adicionadas com sucesso',
  })
  @ApiBody({ type: AddImangesCheckListBodyDto })
  async addImangesCheckList(
    @Param('demandaId') demandaId: string,
    @Body() imagem: AddImangesCheckListBodyDto,
    @Param('processo') processo: string,
  ): Promise<void> {
    return this.addUrlToDemandaUseCase.execute(
      demandaId,
      processo,
      imagem.image,
    );
  }
}
