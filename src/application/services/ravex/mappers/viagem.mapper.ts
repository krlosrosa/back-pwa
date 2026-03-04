import { definirTipoDevolucao } from '../../../../domain/devolucao/enums/tipo.enum.js';
import { ProdutoDto } from '../../../../domain/produto/model/produto.schema.js';
import { AnomaliasViagemResponseDto } from '../model/anomalias-viagem.schema.js';
import { RavexResponseViagemDto } from '../model/viagem.schema.js';

export class ViagemMapper {
  // Transforma a lista em um dicionário para busca O(1)
  private static criarMapaProdutos(produtos: ProdutoDto[]) {
    return new Map(produtos.map((p) => [p.sku, p]));
  }

  static paraResponse(
    viagemId: string,
    ravexViagemGeral: RavexResponseViagemDto,
    ravexViagemData: AnomaliasViagemResponseDto,
    produtosDto: ProdutoDto[],
  ) {
    const mapaProdutos = this.criarMapaProdutos(produtosDto);

    return {
      idViagem: viagemId,
      motorista: ravexViagemGeral.data.motorista?.nome ?? '',
      placa: ravexViagemGeral.data.veiculo?.placa ?? '',
      transportadora: ravexViagemGeral.data.transportadora?.nome ?? '',
      notas: ravexViagemData.data.map((nota) =>
        this.mapearNota(nota, mapaProdutos),
      ),
    };
  }

  private static mapearNota(nota: any, mapaProdutos: Map<string, ProdutoDto>) {
    // Busca o primeiro item para identificar a empresa
    const primeiroSku = nota.itens[0]?.codigo;
    const produtoReferencia = mapaProdutos.get(primeiroSku);

    return {
      tipo: definirTipoDevolucao(Number(nota.tipoRetorno)),
      notaFiscal: nota.numeroNotaFiscal,
      notaFiscalParcial: null,
      motivoDevolucao: nota.motivo.codigo,
      descMotivoDevolucao: nota.motivo.descricao,
      operador: nota.operador?.nome,
      empresa: produtoReferencia?.empresa ?? 'produto não encontrado',
      itens: nota.itens.map((item) => this.mapearItem(item, mapaProdutos)),
    };
  }

  private static mapearItem(item: any, mapaProdutos: Map<string, ProdutoDto>) {
    const produto = mapaProdutos.get(item.codigo);
    const conversao = this.calcularConversao(
      item.pesoLiquidoDevolvido,
      produto,
    );

    return {
      sku: item.codigo,
      descricao: produto?.descricao ?? 'produto não encontrado',
      pesoLiquido: item.pesoLiquidoDevolvido,
      quantidadeRavex: item.quantidadeDevolvida,
      ...conversao,
    };
  }

  private static calcularConversao(pesoLiquido: number, produto?: ProdutoDto) {
    const pesoUn = Number(produto?.pesoLiquidoUnidade ?? 0);
    const unPorCaixa = Number(produto?.unPorCaixa ?? 0);

    const unidadesTotais =
      pesoUn > 0 ? Math.round((pesoLiquido / pesoUn) * 1000) / 1000 : 0;

    return {
      quantidadeCaixas:
        unPorCaixa > 0 ? Math.ceil(unidadesTotais / unPorCaixa) : 0,
      quantidadeUnidades:
        unPorCaixa > 0 ? Math.ceil(unidadesTotais % unPorCaixa) : 0,
      fatorConversao: pesoUn,
      unPorCaixa: unPorCaixa,
      decimal: unidadesTotais,
    };
  }
}
