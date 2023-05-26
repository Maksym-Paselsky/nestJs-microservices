import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  @InjectModel(Product.name)
  private readonly productModel: Model<ProductDocument>;

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }
}
