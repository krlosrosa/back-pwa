import { Injectable, Inject } from '@nestjs/common';
import { IDevolucaoRepository } from '../../domain/devolucao/repositories/devoluca.repository.js';
import { type DrizzleClient } from './drizzle/config/drizzle.provider.js';
import {
  devolucaImagens,
  devolucaoAnomalias,
  devolucaoCheckList,
  devolucaoDemanda,
  devolucaoItens,
  devolucaoNotas,
} from './drizzle/config/migrations/schema.js';
import { and, eq, inArray, or, sql } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from './drizzle/config/drizzle.constat.js';
import { DemandDto } from '../../domain/devolucao/model/demanda-retorno.schema.js';
import { AddNotaDto } from '../../domain/devolucao/model/add-nota.schema.js';
import { agruparPorTipoSkuEDevolucao } from '../../domain/devolucao/mappers/contabil-mapper.js';
import {
  EntradaDto,
  ItensContabilDto,
} from '../../domain/devolucao/model/get-itens-contabil.schema.js';
import { AddCheckListDto } from '../../domain/devolucao/model/add-check-list.schema.js';
import { StatusDevolucao } from '../../domain/devolucao/enums/status.enum.js';
import { AddConferenciaCegaDto } from '../../domain/devolucao/model/add-contagem.schema.js';
import { AddAnomaliaDto } from '../../domain/devolucao/model/add-anomalia.schema.js';
import { GetItensDemandaDto } from '../../domain/devolucao/model/get-itens.demanda.schema.js';
import { GetAnomaliasByDemandaDto } from '../../domain/devolucao/model/get-anomalias-by-demanda.schema.js';
import {
  DemandCompactDto,
  DemandItemCompact,
  AnomaliaCompact,
} from '../../domain/devolucao/model/get-demanda-compact.schema.js';

@Injectable()
export class DevolucaoDrizzleRepository implements IDevolucaoRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  async findById(id: number): Promise<any> {
    return this.db
      .select()
      .from(devolucaoDemanda)
      .where(eq(devolucaoDemanda.id, id));
  }

  async findNotasByDemandaId(id: number): Promise<any[]> {
    return this.db
      .select()
      .from(devolucaoNotas)
      .where(eq(devolucaoNotas.devolucaoDemandaId, id));
  }

  async findItensByDemandaId(id: number): Promise<GetItensDemandaDto[]> {
    const itens = await this.db.query.devolucaoItens.findMany({
      where: eq(devolucaoItens.demandaId, id),
      with: {
        devolucaoNota: true,
      },
    });
    return itens.map((item) => {
      const tipoDevolucao =
        item.devolucaoNota?.tipo === 'REENTREGA' ? 'REENTREGA' : 'RETORNO';
      return {
        ...item,
        lote: item.lote || undefined,
        fabricacao: item.fabricacao?.toString() || undefined,
        sif: item.sif || undefined,
        quantidadeCaixas: item.quantidadeCaixas || undefined,
        quantidadeUnidades: item.quantidadeUnidades || undefined,
        devolucaoNotasId: item.devolucaoNotasId || undefined,
        avariaCaixas: item.avariaCaixas || undefined,
        avariaUnidades: item.avariaUnidades || undefined,
        notaId: item.notaId || undefined,
        tipoDevolucao: tipoDevolucao,
      };
    });
  }

  async create(
    demand: DemandDto,
    centerId: string,
    adicionadoPorId: string,
  ): Promise<string | null> {
    const demandId = await this.db
      .insert(devolucaoDemanda)
      .values({
        ...demand,
        centerId,
        adicionadoPorId,
        atualizadoEm: new Date().toISOString(),
        senha: process.env.SENHA || '',
      })
      .returning({ id: devolucaoDemanda.id });
    return demandId[0].id.toString();
  }

  async findDemandasByCenterId(
    centerId: string,
    data: string,
  ): Promise<DemandDto[] | null> {
    const demandas = await this.db
      .select()
      .from(devolucaoDemanda)
      .where(
        and(
          eq(devolucaoDemanda.centerId, centerId),
          sql`${devolucaoDemanda.criadoEm}::date = ${data}`,
        ),
      )
      .orderBy(devolucaoDemanda.criadoEm);

    return demandas.map((demand) => ({
      ...demand,
      status: demand.status as StatusDevolucao,
    }));
  }

  async addNfInDemand(addNotaDto: AddNotaDto): Promise<void> {
    const addDemanda = {
      empresa: addNotaDto.empresa,
      devolucaoDemandaId: addNotaDto.devolucaoDemandaId,
      notaFiscal: addNotaDto.notaFiscal,
      motivoDevolucao: addNotaDto.motivoDevolucao,
      descMotivoDevolucao: addNotaDto.descMotivoDevolucao,
      nfParcial: addNotaDto.nfParcial,
      idViagemRavex: addNotaDto.idViagemRavex,
      tipo: addNotaDto.tipo,
      atualizadoEm: new Date().toISOString(),
      criadoEm: new Date().toISOString(),
    };
    await this.db.transaction(async (tx) => {
      const notaId = await tx
        .insert(devolucaoNotas)
        .values({
          ...addDemanda,
        })
        .returning({ id: devolucaoNotas.id });
      const ItensNota = addNotaDto.itens.map((item) => ({
        ...item,
        devolucaoNotasId: addNotaDto.notaFiscal,
        demandaId: addNotaDto.devolucaoDemandaId,
        atualizadoEm: new Date().toISOString(),
        criadoEm: new Date().toISOString(),
        tipo: 'CONTABIL' as const,
        sku: item.sku,
        descricao: item.descricao,
        lote: item.lote,
        fabricacao: item.fabricacao?.toString(),
        sif: item.sif,
        quantidadeCaixas: item.quantidadeCaixas,
        quantidadeUnidades: item.quantidadeUnidades,
        avariaCaixas: item.avariaCaixas,
        notaId: notaId[0].id,
      }));
      await tx.insert(devolucaoItens).values(ItensNota);
    });
  }

  async liberateDemand(demandaId: string): Promise<void> {
    await this.db
      .update(devolucaoDemanda)
      .set({
        status: 'AGUARDANDO_CONFERENCIA',
        liberadoParaConferenciaEm: new Date().toISOString(),
      })
      .where(eq(devolucaoDemanda.id, Number(demandaId)));
  }

  async findDemandasOpen(
    centerId: string,
    accountId: string,
  ): Promise<DemandDto[]> {
    const demandas = await this.db
      .select()
      .from(devolucaoDemanda)
      .where(
        and(
          eq(devolucaoDemanda.centerId, centerId),
          or(
            and(
              eq(devolucaoDemanda.status, 'EM_CONFERENCIA'),
              eq(devolucaoDemanda.conferenteId, accountId),
            ),
            eq(devolucaoDemanda.status, 'AGUARDANDO_CONFERENCIA'),
          ),
        ),
      );
    return demandas.map((demand) => ({
      ...demand,
      status: demand.status as StatusDevolucao,
    }));
  }

  async startDemanda(
    demandaId: string,
    doca: string,
    accountId: string,
  ): Promise<void> {
    await this.db
      .update(devolucaoDemanda)
      .set({
        status: 'EM_CONFERENCIA',
        inicioConferenciaEm: new Date().toISOString(),
        doca,
        conferenteId: accountId,
      })
      .where(eq(devolucaoDemanda.id, Number(demandaId)));
  }

  async getItensContabil(demandaId: string): Promise<ItensContabilDto[]> {
    const itens = await this.db.query.devolucaoNotas.findMany({
      where: eq(devolucaoNotas.devolucaoDemandaId, Number(demandaId)),
      with: {
        devolucaoItens: true,
      },
    });

    const subItens: EntradaDto[] = itens.flatMap((d) => {
      return d.devolucaoItens.map((i) => {
        return {
          ...i,
          tipoDevolucao: d.tipo === 'REENTREGA' ? 'REENTREGA' : 'RETORNO',
        };
      });
    });
    const itensAgrupados = agruparPorTipoSkuEDevolucao(subItens);

    return itensAgrupados;
  }

  async addCheckList(
    checkList: AddCheckListDto,
    demandaId: string,
  ): Promise<void> {
    return await this.db.transaction(async (tx) => {
      await tx
        .insert(devolucaoCheckList)
        .values({
          temperaturaBau: Number(checkList?.temperaturaBau || 0),
          temperaturaProduto: Number(checkList?.temperaturaProduto || 0),
          anomalias: [],
          atualizadoEm: new Date().toISOString(),
          demandaId: Number(demandaId),
        })
        .onConflictDoUpdate({
          target: devolucaoCheckList.demandaId, // coluna única ou chave primária
          set: {
            temperaturaBau: Number(checkList?.temperaturaBau || 0),
            temperaturaProduto: Number(checkList?.temperaturaProduto || 0),
            atualizadoEm: new Date().toISOString(),
          },
        });

      // 2. Antes de inserir imagens, remove as antigas com mesmo demandaId + processo
      await tx
        .delete(devolucaImagens)
        .where(
          and(
            eq(devolucaImagens.demandaId, Number(demandaId)),
            eq(devolucaImagens.processo, 'devolucao-check-list'),
          ),
        );
    });
  }

  async addContagemCegaIndividual(
    demandaId: string,
    contagem: AddConferenciaCegaDto,
  ): Promise<void> {
    await this.db.insert(devolucaoItens).values({
      ...contagem,
      uuid: contagem.uuid || null,
      tipo: 'FISICO' as 'CONTABIL' | 'FISICO',
      demandaId: Number(demandaId),
    });
  }

  async addContagemCega(
    demandaId: string,
    contagem: AddConferenciaCegaDto[],
  ): Promise<void> {
    const withTipo = contagem.map((item) => ({
      ...item,
      uuid: item.uuid || null,
      tipo: 'FISICO' as 'CONTABIL' | 'FISICO',
      demandaId: Number(demandaId),
    }));
    await this.db.transaction(async (tx) => {
      await tx
        .delete(devolucaoItens)
        .where(
          and(
            eq(devolucaoItens.demandaId, Number(demandaId)),
            eq(devolucaoItens.tipo, 'FISICO'),
          ),
        );
      await tx.insert(devolucaoItens).values(withTipo);
    });
  }

  async finishDemanda(demandaId: string): Promise<void> {
    await this.db
      .update(devolucaoDemanda)
      .set({
        status: 'CONFERENCIA_FINALIZADA',
        fimConferenciaEm: new Date().toISOString(),
      })
      .where(eq(devolucaoDemanda.id, Number(demandaId)));
  }

  async addAnomalia(anomalia: AddAnomaliaDto): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx.insert(devolucaoAnomalias).values({
        demandaId: anomalia.demandaId,
        sku: anomalia.sku,
        descricao: anomalia.descricao,
        uuid: anomalia.uuid,
        lote: anomalia.lote,
        tipo: anomalia.tipo,
        natureza: anomalia.natureza,
        causa: anomalia.causa,
        quantidadeCaixas: anomalia.quantidadeCaixas,
        quantidadeUnidades: anomalia.quantidadeUnidades,
        atualizadoEm: new Date().toISOString(),
        criadoEm: new Date().toISOString(),
      });
      const urls = anomalia.imagens.map((imagem) => ({
        demandaId: anomalia.demandaId,
        processo: 'devolucao-anomalias',
        tag: imagem,
      }));

      await tx.insert(devolucaImagens).values(urls);
    });
  }

  async removeAnomalia(anomalia: AddAnomaliaDto): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .delete(devolucaoAnomalias)
        .where(
          and(
            eq(devolucaoAnomalias.demandaId, anomalia.demandaId),
            eq(devolucaoAnomalias.sku, anomalia.sku),
            eq(devolucaoAnomalias.lote, anomalia.lote),
          ),
        );
      await tx
        .delete(devolucaImagens)
        .where(
          and(
            eq(devolucaImagens.demandaId, anomalia.demandaId),
            eq(devolucaImagens.processo, 'devolucao-anomalias'),
            inArray(devolucaImagens.tag, anomalia.imagens),
          ),
        );
    });
  }

  async findAnomaliasByDemandaId(
    demandaId: number,
  ): Promise<GetAnomaliasByDemandaDto[]> {
    const anomalias = await this.db.query.devolucaoAnomalias.findMany({
      where: eq(devolucaoAnomalias.demandaId, demandaId),
      with: {
        devolucaoDemanda: {
          with: {
            devolucaImagens: true,
          },
        },
      },
    });
    return anomalias.map((anomalia) => ({
      ...anomalia,
      imagens: anomalia.devolucaoDemanda.devolucaImagens.map(
        (imagem) => imagem.tag,
      ),
    }));
  }

  async addImagemFim(imagens: string[], demandaId: string): Promise<void> {
    const urls = imagens.map((imagem) => ({
      demandaId: Number(demandaId),
      processo: 'devolucao-fim',
      tag: imagem,
    }));
    await this.db.insert(devolucaImagens).values(urls);
  }

  async addUrlToDemanda(
    demandaId: string,
    processo: string,
    tag: string,
  ): Promise<void> {
    await this.db.insert(devolucaImagens).values({
      demandaId: Number(demandaId),
      processo: processo,
      tag: tag,
    });
  }

  async findDemandaCompact(demandaId: number): Promise<DemandCompactDto> {
    const statusMap: Record<string, 'open' | 'in_conference' | 'completed'> = {
      AGUARDANDO_LIBERACAO: 'open',
      AGUARDANDO_CONFERENCIA: 'open',
      EM_CONFERENCIA: 'in_conference',
      CONFERENCIA_FINALIZADA: 'completed',
      FINALIZADO: 'completed',
      CANCELADO: 'completed',
    };

    const [demandaRows, checklistRows, itens, anomalias, imagens] =
      await Promise.all([
        this.db
          .select()
          .from(devolucaoDemanda)
          .where(eq(devolucaoDemanda.id, demandaId))
          .limit(1),
        this.db
          .select()
          .from(devolucaoCheckList)
          .where(eq(devolucaoCheckList.demandaId, demandaId))
          .limit(1),
        this.db.query.devolucaoItens.findMany({
          where: eq(devolucaoItens.demandaId, demandaId),
          with: { devolucaoNota: true },
        }),
        this.db
          .select()
          .from(devolucaoAnomalias)
          .where(eq(devolucaoAnomalias.demandaId, demandaId)),
        this.db
          .select()
          .from(devolucaImagens)
          .where(eq(devolucaImagens.demandaId, demandaId)),
      ]);

    const demanda = demandaRows[0];
    if (!demanda) {
      return null as unknown as DemandCompactDto;
    }

    const contabilItens = itens.filter((i) => i.tipo === 'CONTABIL');
    const fisicoItens = itens.filter((i) => i.tipo === 'FISICO');

    const itemsMap = new Map<string, DemandItemCompact>();

    for (const item of contabilItens) {
      const isReentrega = item.devolucaoNota?.tipo === 'REENTREGA';
      const key = item.sku;
      if (!itemsMap.has(key)) {
        itemsMap.set(key, {
          id: item.uuid || item.id.toString(),
          codigoProduto: item.sku,
          descricao: item.descricao,
          caixasEsperadas: item.quantidadeCaixas || 0,
          unidadesEsperadas: item.quantidadeUnidades || 0,
          isReentrega,
          conferencias: [],
          anomalias: [],
        });
      } else {
        const existing = itemsMap.get(key)!;
        existing.caixasEsperadas += item.quantidadeCaixas || 0;
        existing.unidadesEsperadas += item.quantidadeUnidades || 0;
      }
    }

    for (const item of fisicoItens) {
      const key = item.sku;
      if (!itemsMap.has(key)) {
        itemsMap.set(key, {
          id: item.uuid || item.id.toString(),
          codigoProduto: item.sku,
          descricao: item.descricao,
          caixasEsperadas: 0,
          unidadesEsperadas: 0,
          isReentrega: false,
          conferencias: [],
          anomalias: [],
          extra: true,
        });
      }
      itemsMap.get(key)!.conferencias.push({
        id: item.uuid || item.id.toString(),
        codigoProduto: item.sku,
        lote: item.lote || undefined,
        caixas: item.quantidadeCaixas || 0,
        unidades: item.quantidadeUnidades || 0,
      });
    }

    for (const anomalia of anomalias) {
      const key = anomalia.sku;
      const fotos = imagens
        .filter((img) => img.processo === 'devolucao-anomalias')
        .map((img) => img.tag);

      const anomaliaItem: AnomaliaCompact = {
        id: anomalia.uuid || anomalia.id.toString(),
        natureza: anomalia.natureza || undefined,
        tipo: anomalia.tipo,
        causa: anomalia.causa || undefined,
        fotos,
        observacoes: undefined,
        caixasDanificadas: anomalia.quantidadeCaixas,
        unidadesDanificadas: anomalia.quantidadeUnidades,
        lote: anomalia.lote,
      };

      if (itemsMap.has(key)) {
        itemsMap.get(key)!.anomalias.push(anomaliaItem);
      } else {
        itemsMap.set(key, {
          id: anomalia.uuid || anomalia.id.toString(),
          codigoProduto: anomalia.sku,
          descricao: anomalia.descricao,
          caixasEsperadas: 0,
          unidadesEsperadas: 0,
          isReentrega: false,
          conferencias: [],
          anomalias: [anomaliaItem],
          extra: true,
        });
      }
    }

    const checklistData = checklistRows[0];

    return {
      id: demanda.id.toString(),
      status: statusMap[demanda.status] || 'open',
      paletesEsperadas: demanda.quantidadePaletes || 0,
      paletesReceptadas: fisicoItens.length,
      doca: demanda.doca || undefined,
      dataGeracao: demanda.criadoEm,
      responsavel: demanda.conferenteId || undefined,
      placa: demanda.placa,
      docaRecepcao: demanda.doca || undefined,
      isSegregada: demanda.cargaSegregada,
      checklist: checklistData
        ? {
            temperaturaTrunk: checklistData.temperaturaBau,
            temperaturaProduto: checklistData.temperaturaProduto,
            observacoes: undefined,
          }
        : undefined,
      items: Array.from(itemsMap.values()),
      sync: 'sync',
    };
  }

  async finalizarDemandaCompacta(
    demandaId: number,
    demanda: DemandCompactDto,
  ): Promise<void> {
    await this.db.transaction(async (tx) => {
      // Remove conferencias (itens FISICO), anomalias e imagens existentes
      await tx
        .delete(devolucaoItens)
        .where(
          and(
            eq(devolucaoItens.demandaId, demandaId),
            eq(devolucaoItens.tipo, 'FISICO'),
          ),
        );

      await tx
        .delete(devolucaoAnomalias)
        .where(eq(devolucaoAnomalias.demandaId, demandaId));

      await tx
        .delete(devolucaImagens)
        .where(
          and(
            eq(devolucaImagens.demandaId, demandaId),
            eq(devolucaImagens.processo, 'devolucao-anomalias'),
          ),
        );

      // Reconstrói conferencias (itens FISICO) agrupadas por item
      const fisicoItens = demanda.items.flatMap((item) =>
        item.conferencias.map((conf) => ({
          uuid: conf.id,
          sku: conf.codigoProduto,
          descricao: item.descricao,
          lote: conf.lote || null,
          quantidadeCaixas: conf.caixas,
          quantidadeUnidades: conf.unidades,
          tipo: 'FISICO' as const,
          demandaId,
        })),
      );

      if (fisicoItens.length > 0) {
        await tx.insert(devolucaoItens).values(fisicoItens);
      }

      // Reconstrói anomalias e suas fotos
      const todasAnomalias = demanda.items.flatMap((item) =>
        item.anomalias.map((anomalia) => ({
          uuid: anomalia.id,
          sku: item.codigoProduto,
          descricao: item.descricao,
          lote: anomalia.lote,
          tipo: anomalia.tipo,
          natureza: anomalia.natureza || null,
          causa: anomalia.causa || null,
          quantidadeCaixas: anomalia.caixasDanificadas,
          quantidadeUnidades: anomalia.unidadesDanificadas,
          demandaId,
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
          fotos: anomalia.fotos,
        })),
      );

      for (const anomalia of todasAnomalias) {
        const { fotos, ...anomaliaData } = anomalia;
        await tx.insert(devolucaoAnomalias).values(anomaliaData);

        if (fotos.length > 0) {
          await tx.insert(devolucaImagens).values(
            fotos.map((tag) => ({
              demandaId,
              processo: 'devolucao-anomalias',
              tag,
            })),
          );
        }
      }

      // Upsert do checklist
      if (demanda.checklist) {
        await tx
          .insert(devolucaoCheckList)
          .values({
            demandaId,
            temperaturaBau: demanda.checklist.temperaturaTrunk ?? 0,
            temperaturaProduto: demanda.checklist.temperaturaProduto ?? 0,
            anomalias: [],
            atualizadoEm: new Date().toISOString(),
          })
          .onConflictDoUpdate({
            target: devolucaoCheckList.demandaId,
            set: {
              temperaturaBau: demanda.checklist.temperaturaTrunk ?? 0,
              temperaturaProduto: demanda.checklist.temperaturaProduto ?? 0,
              atualizadoEm: new Date().toISOString(),
            },
          });
      }
    });
  }

  async deleteContagemCega(uuid: string): Promise<void> {
    await this.db.delete(devolucaoItens).where(eq(devolucaoItens.uuid, uuid));
  }

  async updateContagemCega(
    uuid: string,
    contagem: Partial<AddConferenciaCegaDto>,
  ): Promise<void> {
    await this.db
      .update(devolucaoItens)
      .set(contagem)
      .where(eq(devolucaoItens.uuid, uuid));
  }
}
