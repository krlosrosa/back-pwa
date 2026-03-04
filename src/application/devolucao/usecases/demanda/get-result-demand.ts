import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DemandaMapper } from '../../../../domain/devolucao/mappers/demanda.mapper.js';
import { ResultadoDemandaDto } from '../../../../domain/devolucao/model/resultado.schema.js';
import { type IDevolucaoRepository } from '../../../../domain/devolucao/repositories/devoluca.repository.js';

/**
 * Caso de uso responsável por obter o resultado completo de uma demanda pelo ID.
 *
 * Este caso de uso realiza as seguintes operações:
 * 1. Busca os dados da demanda, notas fiscais e itens em paralelo para otimizar performance
 * 2. Valida se a demanda existe no sistema
 * 3. Delega a transformação e agrupamento dos dados para o DemandaMapper
 * 4. Retorna um DTO estruturado contendo todas as informações da demanda,
 *    incluindo dados do veículo, motorista, transportadora, status, notas fiscais
 *    e itens agrupados por SKU com quantidades contábeis e físicas
 *
 * @class GetResultadoDemanda
 */
@Injectable()
export class GetResultadoDemanda {
  /**
   * Cria uma instância do caso de uso GetResultadoDemanda.
   *
   * @param {IDevolucaoRepository} devolucaoRepository - Repositório responsável pelo acesso
   * aos dados de devoluções, demandas, notas e itens
   */
  constructor(
    @Inject('IDevolucaoRepository')
    private readonly devolucaoRepository: IDevolucaoRepository,
  ) {}

  /**
   * Executa o caso de uso para obter o resultado completo de uma demanda.
   *
   * O método busca em paralelo os dados da demanda, suas notas fiscais e itens,
   * valida a existência da demanda e utiliza o mapper para transformar e agrupar
   * os dados em um DTO estruturado com todas as informações necessárias.
   *
   * @param {number} demandaId - ID único da demanda a ser consultada
   * @returns {Promise<ResultadoDemandaDto>} DTO contendo informações completas da demanda,
   * incluindo dados do veículo, motorista, transportadora, doca, conferente, status,
   * timestamps de criação e processamento, notas fiscais associadas e itens agrupados
   * por SKU com quantidades contábeis, físicas, saldos e avarias
   * @throws {NotFoundException} Quando a demanda não é encontrada no sistema
   *
   * @example
   * ```typescript
   * const useCase = new GetResultadoDemanda(devolucaoRepository);
   * const resultado = await useCase.execute(123);
   * console.log(resultado.placa); // Placa do veículo
   * console.log(resultado.notas); // Array de notas fiscais
   * console.log(resultado.itens); // Array de itens agrupados por SKU
   * ```
   */
  async execute(demandaId: number): Promise<ResultadoDemandaDto> {
    // 1. Busca os dados através da abstração (Interface) em paralelo para otimizar performance
    // Promise.all executa todas as consultas simultaneamente, reduzindo o tempo total de execução
    const [demanda, notas, itens] = await Promise.all([
      this.devolucaoRepository.findById(demandaId),
      this.devolucaoRepository.findNotasByDemandaId(demandaId),
      this.devolucaoRepository.findItensByDemandaId(demandaId),
    ]);

    // 2. Validação: verifica se a demanda foi encontrada no sistema
    if (!demanda) {
      throw new NotFoundException('Demanda não encontrada');
    }

    // 3. Delega a transformação e agrupamento dos dados para o Mapper
    // O mapper é responsável por estruturar os dados brutos em um DTO formatado,
    // incluindo o agrupamento de itens por SKU e cálculo de saldos
    return DemandaMapper.paraResultadoDto(demanda, notas, itens);
  }
}
