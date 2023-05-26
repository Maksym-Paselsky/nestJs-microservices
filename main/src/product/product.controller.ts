import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @EventPattern('hello')
  hello(data: string) {
    console.log(data);
  }
}
