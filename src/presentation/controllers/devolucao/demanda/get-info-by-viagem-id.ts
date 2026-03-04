import { Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetInfoByViagemId } from '../../../../application/devolucao/usecases/demanda/get-info-by-viagemId.js';
import { ResponseRavexDto } from '../../../../application/services/ravex/model/response.schema.js';
import { ApiController } from '../../../../main/decorators/api-controller.decorator.js';

/**
 * Controller responsável por expor o endpoint REST para buscar informações
 * completas de uma viagem pelo ID.
 *
 * Este controller atua como a camada de apresentação da aplicação, recebendo
 * requisições HTTP e delegando a lógica de negócio para o caso de uso correspondente.
 * O endpoint busca informações da viagem no sistema Ravex, incluindo dados do
 * motorista, veículo, transportadora, notas fiscais e itens associados.
 *
 * @class GetInfoByViagemIdController
 */
@ApiController({ tag: 'Devolucao', path: 'devolucao' })
export class GetInfoByViagemIdController {
  /**
   * Cria uma instância do controller GetInfoByViagemIdController.
   *
   * @param {GetInfoByViagemId} getInfoByViagemIdUseCase - Caso de uso responsável
   * pela lógica de negócio para buscar informações da viagem
   */
  constructor(private readonly getInfoByViagemIdUseCase: GetInfoByViagemId) {}

  /**
   * Endpoint GET para buscar informações completas de uma viagem pelo ID.
   *
   * Este endpoint recebe o ID da viagem como parâmetro de rota e retorna
   * todas as informações relacionadas, incluindo dados do motorista, veículo,
   * transportadora, notas fiscais com seus itens e produtos associados.
   *
   * @route GET /devolucao/info-by-viagem-id/:viagemId
   * @param {string} viagemId - ID único da viagem a ser consultada (parâmetro de rota)
   * @returns {Promise<ResponseRavexDto>} DTO contendo informações completas da viagem,
   * incluindo dados do motorista, veículo, transportadora, notas fiscais e itens
   * @throws {NotFoundException} Quando a viagem não é encontrada no sistema Ravex
   * @throws {Error} Quando não há itens associados às anomalias da viagem
   *
   * @example
   * ```bash
   * GET /devolucao/info-by-viagem-id/VIAGEM-123
   * ```
   *
   * @example
   * ```typescript
   * // Resposta de sucesso (200)
   * {
   *   "idViagem": "VIAGEM-123",
   *   "motorista": "João Silva",
   *   "placa": "ABC1234",
   *   "transportadora": "Transportadora XYZ",
   *   "notas": [
   *     {
   *       "tipo": "DEVOLUCAO_TOTAL",
   *       "notaFiscal": "12345",
   *       "motivoDevolucao": "01",
   *       "descMotivoDevolucao": "Produto avariado",
   *       "itens": [...]
   *     }
   *   ]
   * }
   * ```
   */
  @Get('info-by-viagem-id/:viagemId')
  @ApiOperation({
    summary: 'Buscar informações da viagem',
    description:
      'Busca informações completas de uma viagem pelo ID, incluindo dados do motorista, ' +
      'veículo, transportadora, notas fiscais e itens associados com produtos mapeados.',
    operationId: 'getInfoByViagemId',
  })
  @ApiResponse({
    status: 200,
    description: 'Viagem encontrada com sucesso',
    type: ResponseRavexDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Viagem não encontrada',
  })
  async getInfoByViagemId(
    @Param('viagemId') viagemId: string,
  ): Promise<ResponseRavexDto> {
    // Delega a execução para o caso de uso, mantendo o controller simples e focado
    // apenas em receber requisições HTTP e retornar respostas
    return this.getInfoByViagemIdUseCase.execute(viagemId);
  }
}
