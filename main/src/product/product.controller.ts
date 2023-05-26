import { Product } from './product.entity';
import { Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('product')
export class ProductController {
  constructor(
    private readonly httpService: HttpService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @EventPattern('hello')
  hello(data: string) {
    console.log(data);
  }

  @EventPattern('product_created')
  productCreated(data: any) {
    this.productService.create(data);
  }

  @EventPattern('product_updated')
  productUpdated(data: any) {
    this.productService.update(data.id, data);
  }

  @Post(':id/like')
  async likeProduct(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    product.likes++;

    this.httpService
      .post(`http://localhost:8000/product/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });

    return this.productService.update(id, product);
  }
}
