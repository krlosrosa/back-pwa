import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ConferenciaCompactSchema = z.object({
  id: z.string(),
  codigoProduto: z.string(),
  lote: z.string().optional().nullable(),
  caixas: z.number().int().default(0),
  unidades: z.number().int().default(0),
});

const AnomaliaCompactSchema = z.object({
  id: z.string(),
  natureza: z.string().optional().nullable(),
  tipo: z.string(),
  causa: z.string().optional().nullable(),
  fotos: z.array(z.string()),
  observacoes: z.string().optional().nullable(),
  caixasDanificadas: z.number().int().default(0),
  unidadesDanificadas: z.number().int().default(0),
  lote: z.string(),
});

const ChecklistCompactSchema = z.object({
  temperaturaTrunk: z.number().optional().nullable(),
  temperaturaProduto: z.number().optional().nullable(),
  observacoes: z.string().optional().nullable(),
});

const DemandItemCompactSchema = z.object({
  id: z.string(),
  codigoProduto: z.string(),
  descricao: z.string(),
  caixasEsperadas: z.number().int().default(0),
  unidadesEsperadas: z.number().int().default(0),
  isReentrega: z.boolean().default(false),
  conferencias: z.array(ConferenciaCompactSchema),
  anomalias: z.array(AnomaliaCompactSchema),
  extra: z.boolean().optional(),
});

export const DemandCompactSchema = z.object({
  id: z.string(),
  status: z.enum(['open', 'in_conference', 'completed']),
  paletesEsperadas: z.number().int().default(0),
  paletesReceptadas: z.number().int().default(0),
  doca: z.string().optional().nullable(),
  dataGeracao: z.string(),
  responsavel: z.string().optional().nullable(),
  placa: z.string(),
  docaRecepcao: z.string().optional().nullable(),
  isSegregada: z.boolean().optional().nullable(),
  checklist: ChecklistCompactSchema.optional().nullable(),
  items: z.array(DemandItemCompactSchema),
  sync: z.enum(['sync', 'pending', 'error', 'not_sync']),
});

export class DemandCompactDto extends createZodDto(DemandCompactSchema) {}

export type DemandItemCompact = z.infer<typeof DemandItemCompactSchema>;
export type AnomaliaCompact = z.infer<typeof AnomaliaCompactSchema>;
export type ConferenciaCompact = z.infer<typeof ConferenciaCompactSchema>;
