import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/category-create.dto';
import { UpdateCategoryDto } from './dto/category-update.dto';
import { CategoryDoc } from './interface/category.interface';
import { CATEGORY_MODEL } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CATEGORY_MODEL)
    private readonly CategoryModel: Model<CategoryDoc>,
  ) {}

  async findCategory(data): Promise<CategoryDoc> {
    return await this.CategoryModel.findOne({ data });
  }

  async all(): Promise<CategoryDoc[]> {
    return await this.CategoryModel.find();
  }

  async findCategoryById(id: string): Promise<CategoryDoc> {
    // return await this.findCategory(id);
    // try {
    const category = await this.CategoryModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!category)
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    return category;
    // } catch (err) {
    //   throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    // }
  }

  async findCategoryByName(name: string) {
    return this.findCategory(name);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDoc> {
    const category = await this.CategoryModel.findOne({
      categoryname: createCategoryDto.categoryname,
    });
    if (category)
      throw new HttpException(
        'Category name already have',
        HttpStatus.BAD_REQUEST,
      );
    return await this.CategoryModel.create({ ...createCategoryDto });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    // const category = await this.findCategory(id);
    const category = await this.CategoryModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!category)
      throw new HttpException(`Can't find category`, HttpStatus.BAD_REQUEST);
    try {
      await category.updateOne(updateCategoryDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'Update complete',
    };
  }

  async deleteCategory(id: string) {
    const category = await this.CategoryModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!category)
      throw new HttpException('Category not exsits', HttpStatus.BAD_REQUEST);

    const deleted = await this.CategoryModel.deleteOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!deleted)
      throw new HttpException('Delete failed', HttpStatus.BAD_REQUEST);

    return {
      message: 'Delete success',
    };
  }
}
