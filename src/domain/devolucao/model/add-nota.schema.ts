import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { TipoDevolucaoNotas } from '../enums/tipo.enum.js';

export const ItensNotaDtoSchema = z.object({
  sku: z.string(),
  descricao: z.string(),
  lote: z.string().optional(),
  fabricacao: z.number().optional(),
  sif: z.string().optional(),
  quantidadeCaixas: z.number(),
  quantidadeUnidades: z.number(),
  avariaCaixas: z.number().optional(),
  tipo: z.nativeEnum(TipoDevolucaoNotas),
  demandaId: z.number(),
});

export const AddNotaDtoSchema = z.object({
  empresa: z.enum(['ITB', 'LDB', 'DPA']),
  devolucaoDemandaId: z.number(),
  notaFiscal: z.string(),
  motivoDevolucao: z.string(),
  descMotivoDevolucao: z.string(),
  nfParcial: z.string().optional(),
  idViagemRavex: z.string().optional(),
  tipo: z.nativeEnum(TipoDevolucaoNotas),
  itens: z.array(ItensNotaDtoSchema),
});

export class AddNotaDto extends createZodDto(AddNotaDtoSchema) {}
