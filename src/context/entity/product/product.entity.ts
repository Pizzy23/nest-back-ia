import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config';
import { ProductDto, ProductFinal } from 'src/view/dto';

@Injectable()
export class ProductEntity {
  constructor(private prisma: PrismaService) {}
  async Product(input: ProductFinal) {
    const user = await this.prisma.seller.findFirst({
      where: { Email: input.email },
    });
    await this.prisma.product.create({
      data: {
        Title: input.title,
        Description: input.description,
        Score: input.score,
        Category: input.category,
        Cep: input.cep,
        Price: input.price,
        Seller: {
          connect: {
            idSeller: user.idSeller,
          },
        },
      },
    });
  }
}
