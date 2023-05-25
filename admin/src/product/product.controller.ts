import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  async createProduct(
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    const product = await this.productService.create({
      title,
      image,
    });
    return product;
  }
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const updatedProduct = { ...product, title, image };

    // set the new values in one line instead of using multiple setters

    return this.productService.update(id, updatedProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
