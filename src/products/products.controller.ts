import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductsDto } from './dto/products-create.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}
  @Get()
  get() {
    return this.ProductsService.all();
  }
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.ProductsService.getProductById(id);
  }
  @Post()
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return this.ProductsService.createProduct(createProductsDto);
  }
}
