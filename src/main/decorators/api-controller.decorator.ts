import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../../infra/guards/auth.guard.js';

interface ApiControllerOptions {
  tag: string;
  path?: string;
  isPublic?: boolean;
}

export function ApiController({
  tag,
  path,
  isPublic = false,
}: ApiControllerOptions) {
  const decorators = [
    ApiTags(tag),
    Controller(path ?? tag.toLowerCase()), // Se não passar path, usa a tag como rota
  ];

  if (!isPublic) {
    decorators.push(
      UseGuards(AuthGuard),
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Token inválido ou ausente' }),
    );
  }

  return applyDecorators(...decorators);
}
