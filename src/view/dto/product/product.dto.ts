import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { ProductCategory } from 'src/view/enum/product.enum';


@Injectable()
export class ProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}

@Injectable()
export class ProductFinal {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
