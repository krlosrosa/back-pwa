import { Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { InfoMeDto } from '../../../domain/users/model/info-me.schema.js';
import { ApiController } from '../../../main/decorators/api-controller.decorator.js';
import { AccountId } from '../../../main/decorators/account-id.decorator.js';
import { GetInfoMe } from '../../../application/users/info-me.js';

@ApiController({ tag: 'User', path: 'user' })
export class InfoMeController {
  constructor(private readonly infoMeUseCase: GetInfoMe) {}
  @Get('info-me')
  @ApiOperation({
    summary: 'Get info me',
    operationId: 'infoMe',
  })
  @ApiResponse({
    status: 200,
    description: 'Info me listados com sucesso',
    type: InfoMeDto,
  })
  infoMe(
    @AccountId() accountId: string, // ✅ direto aqui
  ): Promise<InfoMeDto> {
    const resultado = this.infoMeUseCase.execute(accountId);
    return resultado;
  }
}
