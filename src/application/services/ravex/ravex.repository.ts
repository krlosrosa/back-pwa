import { AnomaliasViagemResponseDto } from './model/anomalias-viagem.schema.js';
import { TokenRavexDto } from './model/token.schema.js';
import { RavexResponseViagemDto } from './model/viagem.schema.js';

export interface IRavexRepository {
  getAnomaliasByViagemId(
    viagemId: string,
    token: string,
  ): Promise<AnomaliasViagemResponseDto | undefined>;
  authRavex(): Promise<TokenRavexDto | undefined>;
  getByViagemId(
    viagemId: string,
    token: string,
  ): Promise<RavexResponseViagemDto | undefined>;
}
