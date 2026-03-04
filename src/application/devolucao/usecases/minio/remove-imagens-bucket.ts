import { MinioService } from '../../../../infra/minio/minio.service.js';
import { Inject } from '@nestjs/common';

export class RemoveImagensBucketUseCase {
  constructor(
    @Inject(MinioService)
    private readonly minioService: MinioService,
  ) {}
  async execute(bucket: string, imagens: string[]): Promise<void> {
    await this.minioService.deleteMany(bucket, imagens);
  }
}
