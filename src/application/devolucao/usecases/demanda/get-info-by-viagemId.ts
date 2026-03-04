import { ResponseRavexDto } from '../../../services/ravex/model/response.schema.js';
import { RavexAuthService } from '../../../services/ravex/RavexAuthService.js';
import { type IRavexRepository } from '../../../services/ravex/ravex.repository.js';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ViagemMapper } from '../../../services/ravex/mappers/viagem.mapper.js';
import { type ProdutoRepository } from '../../../../domain/produto/repositories/IProduto.repository.js';

/**
 * Caso de uso responsável por obter informações completas de uma viagem pelo ID.
 *
 * Este caso de uso realiza as seguintes operações:
 * 1. Autentica no serviço Ravex para obter token de acesso
 * 2. Busca as anomalias da viagem no repositório Ravex
 * 3. Busca os dados gerais da viagem no repositório Ravex
 * 4. Extrai os SKUs únicos dos itens das anomalias
 * 5. Busca os produtos correspondentes aos SKUs no repositório de produtos
 * 6. Mapeia e combina todas as informações em um DTO de resposta estruturado
 *
 * @class GetInfoByViagemId
 */
@Injectable()
export class GetInfoByViagemId {
  /**
   * Cria uma instância do caso de uso GetInfoByViagemId.
   *
   * @param {RavexAuthService} authService - Serviço responsável pela autenticação no Ravex
   * @param {IRavexRepository} ravexRepository - Repositório para acesso aos dados do Ravex
   * @param {ProdutoRepository} produtoRepository - Repositório para acesso aos dados de produtos
   */
  constructor(
    private readonly authService: RavexAuthService,
    @Inject('IRavexRepository')
    private readonly ravexRepository: IRavexRepository,
    @Inject('IProdutoRepository')
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  /**
   * Executa o caso de uso para obter informações completas de uma viagem.
   *
   * O método realiza a busca de anomalias e dados da viagem, extrai os SKUs únicos
   * dos itens das anomalias, busca os produtos correspondentes e retorna um DTO
   * estruturado com todas as informações mapeadas.
   *
   * @param {string} viagemId - ID único da viagem a ser consultada
   * @returns {Promise<ResponseRavexDto>} DTO contendo informações completas da viagem,
   * incluindo dados do motorista, veículo, transportadora, notas fiscais e itens
   * @throws {NotFoundException} Quando a viagem não é encontrada no sistema Ravex
   * @throws {Error} Quando não há itens associados às anomalias da viagem
   *
   * @example
   * ```typescript
   * const useCase = new GetInfoByViagemId(authService, ravexRepo, produtoRepo);
   * const resultado = await useCase.execute('VIAGEM-123');
   * console.log(resultado.motorista); // Nome do motorista
   * console.log(resultado.notas); // Array de notas fiscais
   * ```
   */
  async execute(viagemId: string): Promise<ResponseRavexDto> {
    // 1. Autenticação no serviço Ravex para obter token de acesso
    const token = await this.authService.getToken();

    // 2. Busca das anomalias da viagem no repositório Ravex
    const anomalias = await this.ravexRepository.getAnomaliasByViagemId(
      viagemId,
      token,
    );

    // 3. Busca dos dados gerais da viagem no repositório Ravex
    const viagem = await this.ravexRepository.getByViagemId(viagemId, token);

    // 4. Validação: verifica se a viagem e suas anomalias foram encontradas
    if (!anomalias || !viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }

    // 5. Validação: verifica se existem itens nas anomalias
    const items = anomalias?.data.map((item) => item.itens);
    if (items?.length === 0 || !items) {
      throw new Error('Itens não encontrados');
    }

    // 6. Extração de SKUs únicos de forma limpa e performática
    // Utiliza flatMap para achatar o array de itens de todas as notas,
    // extrai os códigos (SKUs) e usa Set para eliminar duplicatas
    const skusUnicos = [
      ...new Set(
        anomalias.data.flatMap((nota) => nota.itens.map((item) => item.codigo)),
      ),
    ];

    // 7. Busca dos produtos correspondentes aos SKUs únicos encontrados
    const produtos = await this.produtoRepository.findBySkus(skusUnicos);

    // 8. Mapeamento e combinação de todas as informações em um DTO estruturado
    return ViagemMapper.paraResponse(viagemId, viagem, anomalias, produtos);
  }
}
