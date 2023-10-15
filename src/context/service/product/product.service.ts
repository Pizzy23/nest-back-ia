import { ProductEntity } from 'src/context/entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductDto, ProductFinal } from 'src/view/dto';
import { description } from 'src/context/mock/product-analyze';
import { AnalyzeService } from './analyze.service';

@Injectable()
export class ProductService {
  constructor(
    private repository: ProductEntity,
    private analyze: AnalyzeService,
  ) {}
  async postNewProduct(product: ProductDto) {
    const desc = await this.analyzeDesc(product);
    const title = await this.analyzeTitle(product);
    if (desc.res == 'ok' && title.res == 'ok') {
      const score = desc.score + title.score;
      let productFinal: ProductFinal = {
        title: product.title,
        description: product.description,
        score: desc.score + title.score,
        category: product.category,
        email: product.email,
        cep: product.cep,
        price: product.price,
      };
      await this.repository.Product(productFinal);
      return { res: productFinal, status: HttpStatus.ACCEPTED };
    } else {
      return {
        res: {
          descRes: desc.res,
          descScore: desc.score,
          titleRes: title.res,
          titleScore: title.score,
        },
        status: HttpStatus.NOT_ACCEPTABLE,
      };
    }
  }

  async analyzeDesc(product: ProductDto) {
    if (product.description) {
      let desc = product.description.toLowerCase();
      if (desc.length < 50) {
        return {
          res: 'Tente detalhar mais sua descrição esta muito simples. Explique sobre o produto, se faria alguma troca e detalhes sobre ele.',
          score: 0.1,
        };
      }
      const result = {};

      description.forEach((palavra) => {
        const regex = new RegExp(palavra, 'ig');
        const foundWords = desc.match(regex);

        if (foundWords) {
          result[palavra] = foundWords.length;
        } else {
          result[palavra] = 0;
        }
      });
      return await this.analyze.analyzeDesc(product, result);
    }
  }
  async analyzeTitle(product: ProductDto) {
    if (product.title) {
      let title = product.title.toLowerCase();
      if (title.length < 10) {
        return {
          res: 'Tente detalhar mais seu titulo esta muito simples.',
          score: 0.1,
        };
      }
      return { res: 'ok', score: 0.2 };
    }
  }
}
