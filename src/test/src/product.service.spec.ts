import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from 'src/context/service';
import { AnalyzeService } from 'src/context/service/product/analyze.service';
import { ProductCategory } from 'src/view/enum/product.enum';
import { ProductEntity } from 'src/context/entity';
import { PrismaService } from 'src/config';

describe('ProductService', () => {
  let productService: ProductService;
  let analyzeService: AnalyzeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, AnalyzeService, ProductEntity, PrismaService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    analyzeService = module.get<AnalyzeService>(AnalyzeService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('analyzeDesc', () => {
    it('should return the result when description is valid', async () => {
      const productDto = {
        title: 'string',
        description:
          'O estado atual do item esta ok, característica do produto tamanho mediano pra grande :)',
        category: ProductCategory.Imoveis,
        email: 'string',
        cep: 'string',
        price: 0,
      };
      const result = await productService.analyzeDesc(productDto);
      expect(result).toEqual({ res: 'ok', score: 0.4 });
    });

    it('should return a simplified description message', async () => {
      const productDto = {
        title: 'string',
        description: 'Short description.',
        category: ProductCategory.Imoveis,
        email: 'string',
        cep: 'string',
        price: 0,
      };
      const result = await productService.analyzeDesc(productDto);
      expect(result).toEqual({
        res: 'Tente detalhar mais sua descrição esta muito simples. Explique sobre o produto, se faria alguma troca e detalhes sobre ele.',
        score: 0.1,
      });
    });
  });

  describe('analyzeTitle', () => {
    it('should return the result when title is valid', async () => {
      const productDto = {
        title: 'Valid Title',
        description: 'This is a valid description',
        category: ProductCategory.Imoveis,
        email: 'string',
        cep: 'string',
        price: 0,
      };
      const result = await productService.analyzeTitle(productDto);
      expect(result).toEqual({ res: 'ok', score: 0.2 });
    });

    it('should return a simplified title message', async () => {
      const productDto = {
        title: 'Short',
        description: 'This is a valid description',
        category: ProductCategory.Imoveis,
        email: 'string',
        cep: 'string',
        price: 0,
      };
      const result = await productService.analyzeTitle(productDto);
      expect(result).toEqual({
        res: 'Tente detalhar mais seu titulo esta muito simples.',
        score: 0.1,
      });
    });
  });
});
