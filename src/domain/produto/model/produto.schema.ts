import { z } from 'zod';
import { Empresa } from './empresa.schema.js';
import { TipoPeso } from './tipoPeso.schema.js';
import { SegmentoProduto } from '../enum/segmento.js';
import { createZodDto } from 'nestjs-zod';

export const ProdutoSchema = z.object({
  codDum: z.string().optional(),
  codEan: z.string().optional(),
  sku: z.string().min(1, 'SKU é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  shelf: z.number().int().positive('Shelf deve ser um número positivo'),
  tipoPeso: z.nativeEnum(TipoPeso),
  pesoLiquidoCaixa: z.string().min(1, 'Peso líquido da caixa é obrigatório'),
  pesoLiquidoUnidade: z
    .string()
    .min(1, 'Peso líquido da unidade é obrigatório'),
  unPorCaixa: z.number().int().positive('Unidades por caixa deve ser positivo'),
  caixaPorPallet: z
    .number()
    .int()
    .positive('Caixas por pallet deve ser positivo'),
  segmento: z.nativeEnum(SegmentoProduto),
  empresa: z.nativeEnum(Empresa),
  criadoEm: z.string().optional(),
});

export class ProdutoDto extends createZodDto(ProdutoSchema) {}
