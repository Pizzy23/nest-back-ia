import { Module } from '@nestjs/common';
import { ProductController, SellersController } from './controller';
import { UtilModule } from 'src/util/util.module';

import { EntityModule } from './entity/entity.module';
import { ProductService,  SellersService } from './service';
import { AnalyzeService } from './service/product/analyze.service';

@Module({
  imports: [EntityModule, UtilModule],
  controllers: [ProductController, SellersController],
  providers: [ProductService,  SellersService, AnalyzeService],
})
export class ContextModule {}
