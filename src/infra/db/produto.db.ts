import { Inject, Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { produto } from './drizzle/config/migrations/schema.js';
import {
  ProdutoDto,
  ProdutoSchema,
} from '../../domain/produto/model/produto.schema.js';
import { DRIZZLE_PROVIDER } from './drizzle/config/drizzle.constat.js';
import { type DrizzleClient } from './drizzle/config/drizzle.provider.js';
import { ProdutoRepository } from '../../domain/produto/repositories/IProduto.repository.js';

@Injectable()
export class ProdutoDrizzleRepository implements ProdutoRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  async create(data: ProdutoDto): Promise<void> {
    await this.db.insert(produto).values({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }

  async createMany(data: ProdutoDto[]): Promise<void> {
    await this.db.insert(produto).values(
      data.map((item) => ({
        ...item,
        updatedAt: new Date().toISOString(),
      })),
    );
  }

  async update(sku: string, data: Partial<ProdutoDto>): Promise<void> {
    await this.db.update(produto).set(data).where(eq(produto.sku, sku));
  }

  async delete(sku: string): Promise<void> {
    await this.db.delete(produto).where(eq(produto.sku, sku));
  }

  async findAll(): Promise<ProdutoDto[]> {
    const result = await this.db.select().from(produto);
    return result.map((item) => ProdutoSchema.parse(item));
  }

  async findBySku(sku: string): Promise<ProdutoDto | null> {
    const result = await this.db
      .select()
      .from(produto)
      .where(eq(produto.sku, sku))
      .limit(1);

    return result[0] ? ProdutoSchema.parse(result[0]) : null;
  }

  async findBySkus(skus: string[]): Promise<ProdutoDto[]> {
    const result = await this.db
      .select()
      .from(produto)
      .where(inArray(produto.sku, skus));
    return result.map((item) => ProdutoSchema.parse(item));
  }
}
