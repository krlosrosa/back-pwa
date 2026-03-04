import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const GetAnomaliasByDemandaSchema = z.object({
  id: z.number(),
  demandaId: z.number(),
  uuid: z.string().optional().nullable(),
  sku: z.string(),
  lote: z.string(),
  tipo: z.string().optional().nullable(),
  natureza: z.string().optional().nullable(),
  causa: z.string().optional().nullable(),
  descricao: z.string(),
  quantidadeCaixas: z.number(),
  quantidadeUnidades: z.number(),
  imagens: z.array(z.string()),
});

export class GetAnomaliasByDemandaDto extends createZodDto(
  GetAnomaliasByDemandaSchema,
) {}
