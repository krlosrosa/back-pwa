import { AddAnomaliaDto } from '../model/add-anomalia.schema.js';
import { AddCheckListDto } from '../model/add-check-list.schema.js';
import { AddConferenciaCegaDto } from '../model/add-contagem.schema.js';
import { AddNotaDto } from '../model/add-nota.schema.js';
import { DemandDto } from '../model/demanda-retorno.schema.js';
import { GetAnomaliasByDemandaDto } from '../model/get-anomalias-by-demanda.schema.js';
import { ItensContabilDto } from '../model/get-itens-contabil.schema.js';
import { GetItensDemandaDto } from '../model/get-itens.demanda.schema.js';

export interface IDevolucaoRepository {
  findById(id: number): Promise<any>;
  findNotasByDemandaId(id: number): Promise<any[]>;
  findItensByDemandaId(id: number): Promise<GetItensDemandaDto[]>;
  findDemandasByCenterId(
    centerId: string,
    data: string,
  ): Promise<DemandDto[] | null>;
  create(
    demand: DemandDto,
    centerId: string,
    adicionadoPorId: string,
  ): Promise<string | null>;
  addNfInDemand(addNotaDto: AddNotaDto): Promise<void>;
  liberateDemand(demandaId: string): Promise<void>;
  findDemandasOpen(centerId: string, accountId: string): Promise<DemandDto[]>;
  startDemanda(
    demandaId: string,
    doca: string,
    accountId: string,
  ): Promise<void>;
  getItensContabil(demandaId: string): Promise<ItensContabilDto[]>;
  addCheckList(checkList: AddCheckListDto, demandaId: string): Promise<void>;
  addContagemCega(
    demandaId: string,
    contagem: AddConferenciaCegaDto[],
  ): Promise<void>;
  addContagemCegaIndividual(
    demandaId: string,
    contagem: AddConferenciaCegaDto,
  ): Promise<void>;
  finishDemanda(demandaId: string): Promise<void>;
  addAnomalia(anomalia: AddAnomaliaDto): Promise<void>;
  addUrlToDemanda(
    demandaId: string,
    processo: string,
    tag: string,
  ): Promise<void>;
  addImagemFim(imagens: string[], demandaId: string): Promise<void>;
  findAnomaliasByDemandaId(
    demandaId: number,
  ): Promise<GetAnomaliasByDemandaDto[]>;
  deleteContagemCega(uuid: string): Promise<void>;
  updateContagemCega(
    uuid: string,
    contagem: Partial<AddConferenciaCegaDto>,
  ): Promise<void>;
}
