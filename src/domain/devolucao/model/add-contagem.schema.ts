import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const addConferenciaCegaSchema = z.object({
  descricao: z.string(),
  sku: z.string(),
  uuid: z.string().optional().nullable(),
  quantidadeCaixas: z.number().default(0),
  quantidadeUnidades: z.number().default(0),
  lote: z.string(),
});

export class AddConferenciaCegaDto extends createZodDto(
  addConferenciaCegaSchema,
) {}
