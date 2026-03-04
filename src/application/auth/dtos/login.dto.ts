import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const loginSchema = z.object({
  id: z.string(),
  password: z.string().min(6),
});

export class LoginDto extends createZodDto(loginSchema) {}
