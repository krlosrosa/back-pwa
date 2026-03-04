import { TipoDevolucaoNotas } from '../enums/tipo.enum.js';
import { ItensDto, ResultadoDemandaDto } from '../model/resultado.schema.js';

// src/domain/devolucao/mappers/demanda.mapper.ts
export class DemandaMapper {
  static paraResultadoDto(
    demanda: any,
    notas: any[],
    itensBrutos: any[],
  ): ResultadoDemandaDto {
    return {
      demandaId: demanda.id,
      placa: demanda.placa ?? '',
      motorista: demanda.motorista ?? '',
      transportadora: demanda.transportadora ?? '',
      doca: demanda.doca ?? '',
      conferente: demanda.conferente ?? '',
      criadoPor: demanda.criadoPor ?? '',
      criadoEm: demanda.criadoEm ?? '',
      LiberadoParaConferenciaEm: demanda.LiberadoParaConferenciaEm ?? '',
      InicioConferenciaEm: demanda.InicioConferenciaEm ?? '',
      FimConferenciaEm: demanda.FimConferenciaEm ?? '',
      FinalizadoEm: demanda.FinalizadoEm ?? '',
      Status: demanda.Status ?? '',
      FechouComAnomalia: demanda.FechouComAnomalia ?? false,
      notas: notas.map((n) => ({
        notaFiscal: n.notaFiscal,
        tipo: n.tipo as TipoDevolucaoNotas,
        notaFiscalParcial: n.nfParcial ?? '',
        descMotivoDevolucao: n.descMotivoDevolucao ?? '',
        viagemId: n.idViagemRavex ?? '',
      })),
      itens: this.agruparItens(itensBrutos),
    };
  }

  private static agruparItens(itens: any[]): ItensDto[] {
    const agrupadoPorSku = new Map<
      string,
      {
        sku: string;
        descricao: string;
        quantidadeCaixasContabil: number;
        quantidadeUnidadesContabil: number;
        quantidadeCaixasFisico: number;
        quantidadeUnidadesFisico: number;
        avariaCaixas: number;
        avariaUnidades: number;
      }
    >();

    for (const item of itens) {
      const sku = item.sku;
      const tipo = item.tipo;
      const quantidadeCaixas = item.quantidadeCaixas ?? 0;
      const quantidadeUnidades = item.quantidadeUnidades ?? 0;
      const avariaCaixas = item.avariaCaixas ?? 0;
      const avariaUnidades = item.avariaUnidades ?? 0;

      if (!agrupadoPorSku.has(sku)) {
        agrupadoPorSku.set(sku, {
          sku,
          descricao: item.descricao,
          quantidadeCaixasContabil: 0,
          quantidadeUnidadesContabil: 0,
          quantidadeCaixasFisico: 0,
          quantidadeUnidadesFisico: 0,
          avariaCaixas: 0,
          avariaUnidades: 0,
        });
      }

      const itemAgrupado = agrupadoPorSku.get(sku)!;

      if (tipo === 'CONTABIL') {
        itemAgrupado.quantidadeCaixasContabil += quantidadeCaixas;
        itemAgrupado.quantidadeUnidadesContabil += quantidadeUnidades;
      } else if (tipo === 'FISICO') {
        itemAgrupado.quantidadeCaixasFisico += quantidadeCaixas;
        itemAgrupado.quantidadeUnidadesFisico += quantidadeUnidades;
      }

      itemAgrupado.avariaCaixas += avariaCaixas;
      itemAgrupado.avariaUnidades += avariaUnidades;
    }

    return Array.from(agrupadoPorSku.values()).map((item) => ({
      sku: item.sku,
      descricao: item.descricao,
      quantidadeCaixasContabil: item.quantidadeCaixasContabil,
      quantidadeUnidadesContabil: item.quantidadeUnidadesContabil,
      quantidadeCaixasFisico: item.quantidadeCaixasFisico,
      quantidadeUnidadesFisico: item.quantidadeUnidadesFisico,
      saldoCaixas: item.quantidadeCaixasFisico - item.quantidadeCaixasContabil,
      saldoUnidades:
        item.quantidadeUnidadesFisico - item.quantidadeUnidadesContabil,
      avariaCaixas: item.avariaCaixas,
      avariaUnidades: item.avariaUnidades,
    }));
  }
}
