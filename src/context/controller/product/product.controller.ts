import { ProductService } from 'src/context/service';
import { Controller, Post, Body, UseInterceptors, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductDto } from 'src/view/dto';
import { SuccessInterceptor } from 'src/config/interceptor/sucess-interceptor';

@ApiTags('Product')
@Controller('/Product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @ApiOperation({
    summary: 'Router for post product',
  })
  @UseInterceptors(SuccessInterceptor)
  @Post('/')
  async postProduct(@Body() input: ProductDto) {
    return await this.service.postNewProduct(input);
  }
  @ApiOperation({
    summary: 'Router gets all products for specific Seller',
  })
  @UseInterceptors(SuccessInterceptor)
  @Get('/')
  async getProduct(@Body() input: ProductDto) {
    return await this.service.postNewProduct(input);
  }
}
