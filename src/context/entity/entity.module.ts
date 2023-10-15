import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config';
import { ProductEntity, SellersEntity } from '.';

@Module({
  exports: [PrismaService, ProductEntity, SellersEntity],
  providers: [PrismaService, ProductEntity, SellersEntity],
})
export class EntityModule {}
