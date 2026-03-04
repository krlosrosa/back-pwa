import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const GetItensDemandaSchema = z.object({
  id: z.number().int().optional(), // SERIAL PRIMARY KEY, geralmente opcional no insert
  sku: z.string(),
  descricao: z.string(),
  lote: z.string().optional(), // se pode ser nulo, coloque .optional()
  fabricacao: z.string().optional(), // DATE como string ISO
  sif: z.string().optional(),
  quantidadeCaixas: z.number().int().optional(),
  quantidadeUnidades: z.number().int().optional(),
  tipo: z.enum(['CONTABIL', 'FISICO']),
  tipoDevolucao: z.enum(['RETORNO', 'REENTREGA']),
  devolucaoNotasId: z.string().optional(),
  demandaId: z.number().int(),
  avariaCaixas: z.number().int().optional(),
  avariaUnidades: z.number().int().optional(),
  nota_id: z.number().int().optional(),
});

export class GetItensDemandaDto extends createZodDto(GetItensDemandaSchema) {}
