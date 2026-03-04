import { AddAnomaliaDto } from '../model/add-anomalia.schema.js';

export interface IAnomaliaDevolucaoRepository {
  removeAnomalia(anomaliaId: string): Promise<void>;
  addAnomalia(anomalia: AddAnomaliaDto): Promise<void>;
  addUrlToAnomalia(demandaId: string, tag: string): Promise<void>;
}
