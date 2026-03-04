import { ProdutoDto } from '../../../domain/produto/model/produto.schema.js';
import { GetAllProdutos } from '../../../application/produto/usecases/get-all-produtos.js';
import { ApiController } from '../../../main/decorators/api-controller.decorator.js';
import { ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { Get } from '@nestjs/common';

@ApiController({ tag: 'Produto', path: 'produto', isPublic: true })
export class GetAllProdutosController {
  constructor(private readonly getAllProdutosUseCase: GetAllProdutos) {}

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os produtos',
    operationId: 'findAllProdutos',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtos encontrados com sucesso',
    type: [ProdutoDto],
  })
  async findAll(): Promise<ProdutoDto[]> {
    return this.getAllProdutosUseCase.execute();
  }
}
