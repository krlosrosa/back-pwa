import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AnomaliaDevolucaoSchema = z.object({
  demandaId: z.number({
    error: 'demandaId é obrigatório',
  }),
  uuid: z.string({
    error: 'uuid é obrigatório',
  }),
  sku: z.string({
    error: 'sku é obrigatório',
  }),
  descricao: z.string({
    error: 'descricao é obrigatória',
  }),
  lote: z.string({
    error: 'lote é obrigatório',
  }),
  tipo: z.string({
    error: 'tipo é obrigatório',
  }),
  natureza: z.string({
    error: 'natureza é obrigatória',
  }),
  causa: z.string({
    error: 'causa é obrigatória',
  }),
  tratado: z.boolean().optional(),
  quantidadeCaixas: z.number({
    error: 'quantidadeCaixas é obrigatória',
  }),
  quantidadeUnidades: z.number({
    error: 'quantidadeUnidades é obrigatória',
  }),
  imagens: z.array(z.string(), {
    error: 'imagens é obrigatório',
  }),
});

export class AddAnomaliaDto extends createZodDto(AnomaliaDevolucaoSchema) {}
