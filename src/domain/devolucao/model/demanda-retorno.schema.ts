import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { StatusDevolucao } from '../enums/status.enum.js';

export const DemandSchema = z.object({
  placa: z.string().min(1, 'Placa do veículo é obrigatória'),
  motorista: z.string().min(1, 'Nome do motorista é obrigatório'),
  idTransportadora: z.string().optional().nullable(),
  telefone: z.string().optional().nullable(),
  cargaSegregada: z.boolean().default(false),
  quantidadePaletes: z
    .number()
    .int('Quantidade de paletes deve ser um número inteiro')
    .min(0, 'Quantidade de paletes não pode ser negativa')
    .default(0)
    .optional()
    .nullable(),
  doca: z.string().optional().nullable(),
  centerId: z.string().min(1, 'CenterId é obrigatório'),
  adicionadoPorId: z.string().min(1, 'AdicionadoPorId é obrigatório'),
  conferenteId: z.string().optional().nullable(),
  senha: z.string().min(1, 'Senha é obrigatória'),
  viagemId: z.string().optional().nullable(),
  status: z.enum(StatusDevolucao),
  criadoEm: z.string(),
  id: z.number(),
});
export class DemandDto extends createZodDto(DemandSchema) {}
