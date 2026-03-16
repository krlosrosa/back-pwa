import { AddCheckListDemandController } from './checklist/add-check-list.demand.js';
import { AddContagemCegaController } from './conferencia/add-contagem-cega.js';
import { AddImagemFimDevolucaoController } from './demanda/add-imagem-fim-devolucao.js';
import { AddNewDemandController } from './demanda/add-new-demand.js';
import { AddNfInDemandaController } from './demanda/add-nf-in-demanda.js';
import { AddAnomaliaDevolucaoController } from './anomalia/add-anomalia-devolucao.js';
import { AddImagemAnomaliaController } from './anomalia/add-imagem-anomalia.js';
import { DeleteAnomaliaDevolucaoController } from './anomalia/delete-anomalia-devolucao.js';
import { AddImangesCheckListController } from './checklist/add-imanges-check-list.js';
import { AddContagemCegaIndividualController } from './conferencia/add-contagem-cega-individual.js';
import { DeleteContagemCegaController } from './conferencia/delete-contagem-cega.js';
import { UpdateContagemCegaController } from './conferencia/update-contagem-cega.js';
import { FinishDemandaController } from './demanda/finish-demanda.js';
import { GetAnomaliasByDemandaController } from './anomalia/get-anomalias-by-demanda.js';
import { GetDemandaByIdController } from './demanda/get-demanda-by-id.js';
import { GetInfoByViagemIdController } from './demanda/get-info-by-viagem-id.js';
import { GetItemByDemandaIdController } from './demanda/get-item-by-demandaId.js';
import { GetItensContabilController } from './demanda/get-itens-contabil.js';
import { GetResultDemandByIdController } from './demanda/get-result-demand-by-id.js';
import { LiberateDemandDevolucaoController } from './demanda/liberate-demand-devolucao.js';
import { ListDemandOpenController } from './demanda/list-demand-open.js';
import { ListDemandasByCenterAndDataController } from './demanda/list-demanda-by-center-and-data.js';
import { PresignedUrlDevolucaoController } from './imagens/presigned-url-devolucao.js';
import { RemoveImangesBucketController } from './imagens/removeImangesBucket.js';
import { StartDemandaDevolucaoController } from './demanda/start-demanda-devolucao.js';
import { GetByDemandaCompactController } from './demanda/get-by-demanda-compact.js';
import { FinalizarDemandaCompactaController } from './demanda/finalizar-demanda-compacta.js';

export const devolucaoControllers = [
  GetResultDemandByIdController, // Vem da pasta Presentation
  GetInfoByViagemIdController, // Vem da pasta Presentation
  AddNewDemandController, // Vem da pasta Presentation
  ListDemandasByCenterAndDataController, // Vem da pasta Presentation
  GetDemandaByIdController,
  AddNfInDemandaController,
  LiberateDemandDevolucaoController,
  ListDemandOpenController,
  StartDemandaDevolucaoController,
  GetItensContabilController,
  AddCheckListDemandController,
  AddContagemCegaController,
  FinishDemandaController,
  AddAnomaliaDevolucaoController,
  PresignedUrlDevolucaoController,
  AddImagemFimDevolucaoController,
  GetItemByDemandaIdController,
  RemoveImangesBucketController,
  GetAnomaliasByDemandaController,
  DeleteAnomaliaDevolucaoController,
  AddContagemCegaIndividualController,
  DeleteContagemCegaController,
  UpdateContagemCegaController,
  AddImangesCheckListController,
  AddImagemAnomaliaController,
  GetByDemandaCompactController,
  FinalizarDemandaCompactaController,
];
