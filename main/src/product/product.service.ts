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

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id: id }).exec();
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async update(id: number, product: Product): Promise<Product> {
    return this.productModel
      .findOneAndUpdate({ id: id }, product, { new: true })
      .exec();
  }
}
