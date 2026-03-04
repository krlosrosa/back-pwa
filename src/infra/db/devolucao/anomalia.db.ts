import { IAnomaliaDevolucaoRepository } from '../../../domain/devolucao/repositories/anomalia.repository.js';
import { DRIZZLE_PROVIDER } from '../drizzle/config/drizzle.constat.js';
import { Inject } from '@nestjs/common';
import { type DrizzleClient } from '../drizzle/config/drizzle.provider.js';
import {
  devolucaImagens,
  devolucaoAnomalias,
} from '../drizzle/config/migrations/schema.js';
import { and, eq } from 'drizzle-orm';
import { AddAnomaliaDto } from '../../../domain/devolucao/model/add-anomalia.schema.js';

export class AnomaliaDrizzleRepository implements IAnomaliaDevolucaoRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async removeAnomalia(anomaliaId: string): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .delete(devolucaoAnomalias)
        .where(eq(devolucaoAnomalias.uuid, anomaliaId));
      await tx
        .delete(devolucaImagens)
        .where(
          and(
            eq(devolucaImagens.processo, 'devolucao-anomalias'),
            eq(devolucaImagens.tag, anomaliaId),
          ),
        );
    });
  }
  async addAnomalia(anomalia: AddAnomaliaDto): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx.insert(devolucaoAnomalias).values({
        demandaId: anomalia.demandaId,
        uuid: anomalia.uuid,
        sku: anomalia.sku,
        descricao: anomalia.descricao,
        lote: anomalia.lote,
        tipo: anomalia.tipo,
        natureza: anomalia.natureza,
        causa: anomalia.causa,
        quantidadeCaixas: anomalia.quantidadeCaixas,
        quantidadeUnidades: anomalia.quantidadeUnidades,
        atualizadoEm: new Date().toISOString(),
        criadoEm: new Date().toISOString(),
      });

      if (anomalia.imagens.length > 0) {
        const urls = anomalia.imagens.map((imagem) => ({
          demandaId: anomalia.demandaId,
          processo: 'devolucao-anomalias',
          tag: imagem,
        }));

        await tx.insert(devolucaImagens).values(urls);
      }
    });
  }

  async addUrlToAnomalia(demandaId: string, tag: string): Promise<void> {
    await this.db.insert(devolucaImagens).values({
      demandaId: Number(demandaId),
      processo: 'devolucao-anomalias',
      tag: tag,
    });
  }
}
