import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config';
import { SellersDto } from 'src/view/dto';

@Injectable()
export class SellersEntity {
  constructor(private prisma: PrismaService) {}
  async postSellers(input: SellersDto) {
    await this.prisma.seller.create({
      data: {
        Email: input.email,
      },
    });
  }
  async getSellers(input: SellersDto) {
    await this.prisma.seller.findFirst({
      where: {
        Email: input.email,
      },
    });
  }
}
