import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductsDto } from './dto/products-create.dto';
import { ProductsDoc } from './interface/products.inteface';
import { PRODUCTS_MODEL } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCTS_MODEL)
    private readonly ProductsModel: Model<ProductsDoc>,
  ) {}

  async getProducts(data: any) {
    return this.ProductsModel.findOne({ data });
  }
  async all(): Promise<ProductsDoc[]> {
    return this.ProductsModel.find();
  }
  async getProductById(id: string): Promise<ProductsDoc> {
    return this.getProducts(id);
  }
  async createProduct(createProductsDto: CreateProductsDto) {
    return this.ProductsModel.create({ ...createProductsDto });
  }
}
