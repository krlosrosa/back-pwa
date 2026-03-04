import { Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PresignedUrlMinio } from '../../../../application/devolucao/usecases/minio/presigned-url-minio.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class PresignedUrlDevolucaoController {
  constructor(private readonly presignedUrlMinioUseCase: PresignedUrlMinio) {}

  @Post('presigned-url-devolucao/check-list/:filename')
  @ApiOperation({
    summary: 'Gerar URL pré-assinada para upload de check list',
    operationId: 'getPresignedUrlCheckListDevolucao',
  })
  @ApiResponse({
    status: 200,
    description:
      'URL pré-assinada para upload de check list gerada com sucesso',
    type: String,
  })
  async getPresignedUrlCheckListDevolucao(
    @Param('filename') filename: string,
  ): Promise<string> {
    return this.presignedUrlMinioUseCase.execute(
      'devolucaochecklist',
      filename,
    );
  }

  @Post('presigned-url-devolucao/anomalia/:filename')
  @ApiOperation({
    summary: 'Gerar URL pré-assinada para upload de anomalia',
    operationId: 'getPresignedUrlAnomaliaDevolucao',
  })
  @ApiResponse({
    status: 200,
    description: 'URL pré-assinada para upload de anomalia gerada com sucesso',
    type: String,
  })
  async getPresignedUrlAnomaliaDevolucao(
    @Param('filename') filename: string,
  ): Promise<string> {
    return this.presignedUrlMinioUseCase.execute(
      'devolucaoanomalias',
      filename,
    );
  }

  @Post('presigned-url-devolucao/fim-devolucao/:filename')
  @ApiOperation({
    summary: 'Gerar URL pré-assinada para upload de fim de devolução',
    operationId: 'getPresignedUrlFimDevolucao',
  })
  @ApiResponse({
    status: 200,
    description:
      'URL pré-assinada para upload de fim de devolução gerada com sucesso',
    type: String,
  })
  async getPresignedUrlFimDevolucao(
    @Param('filename') filename: string,
  ): Promise<string> {
    return this.presignedUrlMinioUseCase.execute(
      'devolucaoprocessoconcluido',
      filename,
    );
  }
}
