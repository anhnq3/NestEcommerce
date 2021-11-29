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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  // param -1 is sort high to low and 1 is low to high
  @ApiTags('Product')
  @ApiOperation({ summary: 'Get all products sort by selling price' })
  @HttpCode(HttpStatus.OK)
  @Get('sortbysellingprice/:sort')
  async getAllSortBySellingPrice(@Param('sort') sort: number) {
    return this.productsService.getAllSortBySellingPrice(sort);
  }

  // param -1 is sort high to low and 1 is low to high
  @ApiTags('Product')
  @ApiOperation({ summary: 'Get all products sort by selling price' })
  @HttpCode(HttpStatus.OK)
  @Get('sortbydate/:sort')
  getAllSortByDate(@Param('sort') sort: number) {
    return this.productsService.getAllSortByDate(sort);
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

  @Get('/filter/category/:categoryname')
  async getProductByCategory(@Param('categoryname') categoryname: string) {
    return this.productsService.getProductByCategory(categoryname);
  }

  @Post('upload')
  @ApiTags('Product')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
