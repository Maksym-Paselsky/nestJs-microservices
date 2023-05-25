import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  //create crud operations here
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: any): Promise<Product> {
    return await this.productRepository.save(data);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: number, product: Product): Promise<any> {
    return await this.productRepository.update(id, product);
  }
  async delete(id: number): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
