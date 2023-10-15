import { SellersEntity } from 'src/context/entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SellersDto } from 'src/view/dto';

@Injectable()
export class SellersService {
  constructor(private repository: SellersEntity) {}
  async postSellers(input: SellersDto) {
    await this.repository.postSellers(input);
    return { res: 'Novo Vendendor criado', status: HttpStatus.OK };
  }
  async getSellers(input: SellersDto) {
    return {
      res: await this.repository.getSellers(input),
      status: HttpStatus.OK,
    };
  }
}
