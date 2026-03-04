import { ProdutoDto } from '../model/produto.schema.js';

export interface ProdutoRepository {
  create(data: ProdutoDto): Promise<void>;
  createMany(data: ProdutoDto[]): Promise<void>;
  update(sku: string, data: Partial<ProdutoDto>): Promise<void>;
  delete(sku: string): Promise<void>;
  findAll(): Promise<ProdutoDto[]>;
  findBySku(sku: string): Promise<ProdutoDto | null>;
  findBySkus(skus: string[]): Promise<ProdutoDto[]>;
}
