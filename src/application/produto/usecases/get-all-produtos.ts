import { Inject } from '@nestjs/common';
import { ProdutoDto } from '../../../domain/produto/model/produto.schema.js';
import { type ProdutoRepository } from '../../../domain/produto/repositories/IProduto.repository.js';

export class GetAllProdutos {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  async execute(): Promise<ProdutoDto[]> {
    const produtos = await this.produtoRepository.findAll();
    return produtos;
  }
}
