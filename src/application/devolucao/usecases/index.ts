import { RavexAuthService } from '../../services/ravex/RavexAuthService.js';
import { AddAnomaliaDevolucao } from './anomalia/add-anomalia-devolucao.js';
import { AddImagemAnomalia } from './anomalia/add-imagem-anomalia.js';
import { DeleteAnomaliaDevolucao } from './anomalia/delete-anomalia-devolucao.js';
import { GetAnomaliasByDemanda } from './anomalia/get-anomalias-by-demanda.js';
import { AddCheckListDemand } from './checklist/add-check-list.js';
import { AddContagemCegaIndividual } from './conferencia/add-contagem-cega-individual.js';
import { AddContagemCegaUseCase } from './conferencia/add-contagem-cega.js';
import { DeleteContagemCegaUseCase } from './conferencia/delete-contagem-cega.js';
import { UpdateContagemCegaUseCase } from './conferencia/update-contagem-cega.js';
import { AddImagemFimDevolucao } from './demanda/add-imagem-fim-devolucao.js';
import AddNfInDemand from './demanda/add-nf-in-demand.js';
import { AddUrlToDemanda } from './demanda/addUrlToDemanda.js';
import { FinishDemanda } from './demanda/finish-demanda.js';
import { GetDemandaById } from './demanda/get-demanda-by-id.js';
import { GetItensByDemandaId } from './demanda/get-itens-by-demandaId.js';
import { GetItensContabil } from './demanda/get-itens-contabil.js';
import { LiberateDemandDevolucao } from './demanda/liberate.demand-devolucao.js';
import { ListDemandOpen } from './demanda/list-demand-open.js';
import { ListDemandasByCenter } from './demanda/list-demandas-by-center.js';
import { StartDemandaDevolucao } from './demanda/start-demanda-devolucao.js';
import { PresignedUrlMinio } from './minio/presigned-url-minio.js';
import { RemoveImagensBucketUseCase } from './minio/remove-imagens-bucket.js';
import { AddNewDemand } from './demanda/add-new-demand.js';
import { GetInfoByViagemId } from './demanda/get-info-by-viagemId.js';
import { GetResultadoDemanda } from './demanda/get-result-demand.js';
import { GetByDemandaCompactUseCase } from './demanda/get-by-demanda-compact.js';
import { FinalizarDemandaCompactaUseCase } from './demanda/finalizar-demanda-compacta.js';

export const devolucaoUseCases = [
  GetResultadoDemanda, // Vem da pasta Application
  GetInfoByViagemId, // Vem da pasta Application
  AddNewDemand,
  RavexAuthService, // Serviço de autenticação Ravex
  ListDemandasByCenter,
  GetDemandaById,
  AddNfInDemand,
  LiberateDemandDevolucao,
  ListDemandOpen,
  StartDemandaDevolucao,
  GetItensContabil,
  AddCheckListDemand,
  AddContagemCegaUseCase,
  FinishDemanda,
  AddAnomaliaDevolucao,
  PresignedUrlMinio,
  AddImagemFimDevolucao,
  GetItensByDemandaId,
  RemoveImagensBucketUseCase,
  GetAnomaliasByDemanda,
  DeleteAnomaliaDevolucao,
  AddContagemCegaIndividual,
  DeleteContagemCegaUseCase,
  UpdateContagemCegaUseCase,
  AddUrlToDemanda,
  AddImagemAnomalia,
  GetByDemandaCompactUseCase,
  FinalizarDemandaCompactaUseCase,
];
