import { Body, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';
import { RemoveImagensBucketUseCase } from '../../../../application/devolucao/usecases/minio/remove-imagens-bucket.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class RemoveImangesBucketController {
  constructor(
    private readonly removeImagensBucketUseCase: RemoveImagensBucketUseCase,
  ) {}
  @Post('remove-imagens-bucket/:bucket')
  @ApiOperation({
    summary: 'Remover imagens do bucket',
    operationId: 'removeImangesBucket',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagens removidas do bucket com sucesso',
  })
  async removeImangesBucket(
    @Param('bucket') bucket: string,
    @Body() imagens: string[],
  ): Promise<void> {
    return this.removeImagensBucketUseCase.execute(bucket, imagens);
  }
}
