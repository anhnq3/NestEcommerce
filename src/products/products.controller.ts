import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductsDto } from './dto/products-create.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiTags('Products')
  @ApiOperation({ summary: 'Get all products' })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.productsService.all();
  }

  @ApiTags('Products')
  @ApiOperation({ summary: 'Get product by Id' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiTags('Products')
  @ApiOperation({ summary: 'Create a product' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.createProduct(createProductsDto);
  }
  // @Put()
}
