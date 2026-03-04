import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DevolucaoDrizzleRepository } from '../db/devolucao.db.js';
import { ProdutoDrizzleRepository } from '../db/produto.db.js';
import { RavexRepository } from '../../application/services/ravex/ravex.db.js';
import { drizzleProvider } from '../db/drizzle/config/drizzle.provider.js';
import { AnomaliaDrizzleRepository } from '../db/devolucao/anomalia.db.js';
import { devolucaoControllers } from '../../presentation/controllers/devolucao/index.js';
import { devolucaoUseCases } from '../../application/devolucao/usecases/index.js';

@Module({
  imports: [HttpModule],
  controllers: [...devolucaoControllers],
  providers: [
    drizzleProvider, // Provider do Drizzle ORM
    ...devolucaoUseCases,
    {
      provide: 'IDevolucaoRepository', // Interface no Domain
      useClass: DevolucaoDrizzleRepository, // Implementação na Infra
    },
    {
      provide: 'IProdutoRepository',
      useClass: ProdutoDrizzleRepository,
    },
    {
      provide: 'IRavexRepository',
      useClass: RavexRepository,
    },
    {
      provide: 'IAnomaliaDevolucaoRepository',
      useClass: AnomaliaDrizzleRepository,
    },
  ],
})
export class DevolucaoModule {}
