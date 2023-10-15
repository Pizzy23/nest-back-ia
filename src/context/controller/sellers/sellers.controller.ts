import { SellersService } from 'src/context/service';
import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SellersDto } from 'src/view/dto';
import { SuccessInterceptor } from 'src/config/interceptor/sucess-interceptor';

@ApiTags('Sellers')
@Controller('/Sellers')
export class SellersController {
  constructor(private readonly service: SellersService) {}

  @ApiOperation({
    summary: 'Router for create new Seller',
  })
  @UseInterceptors(SuccessInterceptor)
  @Post('/')
  async postSellers(@Body() input: SellersDto) {
    return await this.service.postSellers(input);
  }
  @ApiOperation({
    summary: 'Router get infos for Sellers',
  })
  @UseInterceptors(SuccessInterceptor)
  @Get('/')
  async getSellers(@Body() input: SellersDto) {
    return await this.service.getSellers(input);
  }
}
