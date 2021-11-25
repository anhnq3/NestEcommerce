import {
  Body,
  Controller,
  Delete,
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
import { UpdateProductDto } from './dto/products-update.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiTags('Product')
  @ApiOperation({ summary: 'Get all products' })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.productsService.all();
  }

  // This can be an Id or product code or product name
  @ApiTags('Product')
  @ApiOperation({ summary: 'Get product by Id' })
  @HttpCode(HttpStatus.OK)
  @Get(':data')
  async getProductById(@Param('data') data: string) {
    return this.productsService.getProductById(data);
  }

  @ApiTags('Product')
  @ApiOperation({ summary: 'Create a product' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.createProduct(createProductsDto);
  }

  @ApiTags('Product')
  @ApiOperation({ summary: 'Update a product' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProductById(id, updateProductDto);
  }

  @ApiTags('Product')
  @ApiOperation({ summary: 'Delete a product' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteProductById(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }
}
