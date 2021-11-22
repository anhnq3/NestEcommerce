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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category-create.dto';
import { UpdateCategoryDto } from './dto/category-update.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiTags('Category')
  @ApiOperation({ summary: 'Get all category' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async all() {
    return this.categoryService.all();
  }

  @ApiTags('Category')
  @ApiOperation({ summary: 'Get category by id' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }

  @ApiTags('Category')
  @ApiOperation({ summary: 'Update a category' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @ApiTags('Category')
  @ApiOperation({ summary: 'Create a category' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createCategory(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategory);
  }

  @ApiTags('Category')
  @ApiOperation({ summary: 'Delete a category' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
