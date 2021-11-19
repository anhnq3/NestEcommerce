import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getProducts(data: any): Promise<ProductsDoc> {
    return this.ProductsModel.findOne({ data });
  }

  async all(): Promise<ProductsDoc[]> {
    return this.ProductsModel.find();
  }
  async getProductById(id: string): Promise<ProductsDoc> {
    const product = await this.ProductsModel.findOne({ _id: id });
    if (!product)
      throw new HttpException(
        'Product name does not exsist',
        HttpStatus.BAD_REQUEST,
      );
    return product;
  }
  async createProduct(
    createProductsDto: CreateProductsDto,
  ): Promise<ProductsDoc> {
    const { productName } = createProductsDto;
    const product_name = await this.ProductsModel.findOne({ productName });
    if (product_name)
      throw new HttpException('Product name exsisted', HttpStatus.BAD_REQUEST);
    return this.ProductsModel.create(createProductsDto);
  }
}
