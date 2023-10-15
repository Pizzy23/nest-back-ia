import { ProductEntity } from 'src/context/entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductDto, ProductFinal } from 'src/view/dto';
import { description } from 'src/context/mock/product-analyze';

@Injectable()
export class AnalyzeService {
  constructor(private repository: ProductEntity) {}
  async analyzeDesc(product: ProductDto, result) {
    if (
      result['estado atual'] === 0 &&
      result['funcionamento'] === 0 &&
      result['estado'] === 0
    ) {
      return {
        res: 'Adicione mais sobre o estado atual do item que deseja vender ou trocar.',
        score: 0.2,
      };
    }
    if (
      result['característica do produto'] === 0 &&
      result['característica do item'] === 0
    ) {
      return {
        res: 'Adicione algumas caracteristicas do produto que esta tentando vender, assim podendo informar o comprador.',
        score: 0.2,
      };
    } else if (
      result['característica do produto'] === 0 &&
      result['característica do item'] === 0 &&
      result['estado atual'] === 0 &&
      result['funcionamento'] === 0 &&
      result['estado'] === 0
    ) {
      return {
        res: 'Inclua mais detalhes como característica do produto e o estado atual dele, sendo gasto ou sem nenhum defeito.',
        score: 0.1,
      };
    }
    return { res: 'ok', score: 0.4 };
  }
}
