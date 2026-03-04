import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AddCheckListSchema = z.object({
  demandaId: z.string().min(1, 'demandaId é obrigatório'),
  temperaturaBau: z.string().regex(/^-?\d+(\.\d+)?$/, {
    message: 'Temperatura do baú deve ser um número válido em formato string',
  }),
  temperaturaProduto: z.string().regex(/^-?\d+(\.\d+)?$/, {
    message:
      'Temperatura do produto deve ser um número válido em formato string',
  }),
  anomalias: z.string().optional(),
});

export class AddCheckListDto extends createZodDto(AddCheckListSchema) {}
