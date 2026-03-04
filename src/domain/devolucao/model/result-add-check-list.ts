import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AddCheckListResponseSchema = z.object({
  uploadUrls: z.object({
    bauAberto: z.string(),
    bauFechado: z.string(),
  }),
});

export class AddCheckListResponseDto extends createZodDto(
  AddCheckListResponseSchema,
) {}
