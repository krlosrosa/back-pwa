import { Module } from '@nestjs/common';
import { ProdutoDrizzleRepository } from '../db/produto.db.js';
import { GetAllProdutosController } from '../../presentation/controllers/produto/get-all-produtos.js';
import { GetAllProdutos } from '../../application/produto/usecases/get-all-produtos.js';
import { drizzleProvider } from '../db/drizzle/config/drizzle.provider.js';

@Module({
  controllers: [GetAllProdutosController],
  providers: [
    drizzleProvider,
    GetAllProdutos,
    {
      provide: 'IProdutoRepository',
      useClass: ProdutoDrizzleRepository,
    },
  ],
})
export class ProdutoModule {}
