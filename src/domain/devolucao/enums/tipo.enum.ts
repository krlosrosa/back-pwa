// src/_shared/enums/devolucao/devolucao.type.ts

export enum TipoDevolucaoNotas {
  DEVOLUCAO = 'DEVOLUCAO',
  DEVOLUCAO_PARCIAL = 'DEVOLUCAO_PARCIAL',
  REENTREGA = 'REENTREGA',
}

// Mapeamento centralizado
const MAPA_TIPO_DEVOLUCAO: Record<number, TipoDevolucaoNotas> = {
  1: TipoDevolucaoNotas.DEVOLUCAO,
  2: TipoDevolucaoNotas.DEVOLUCAO_PARCIAL,
  3: TipoDevolucaoNotas.REENTREGA,
};

export function definirTipoDevolucao(tipo: number): TipoDevolucaoNotas {
  return MAPA_TIPO_DEVOLUCAO[tipo] ?? TipoDevolucaoNotas.DEVOLUCAO;
}
