import { Inject } from '@nestjs/common';
import { MinioService } from '../../../../infra/minio/minio.service.js';

export class PresignedUrlMinio {
  constructor(
    @Inject(MinioService)
    private readonly minioService: MinioService,
  ) {}
  async execute(bucket: string, fileName: string): Promise<string> {
    return await this.minioService.getPresignedUploadUrl(bucket, fileName);
  }
}
