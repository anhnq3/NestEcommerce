import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDoc } from 'src/category/interface/category.interface';
import { CATEGORY_MODEL } from 'src/category/schema/category.schema';
import { FlashSalesDoc } from 'src/flashsales/interface/flashsale.interface';
import { FLASHSALES_MODEL } from 'src/flashsales/schema/flashsales.schema';
import { CreateProductsDto } from './dto/products-create.dto';
import { UpdateProductDto } from './dto/products-update.dto';
import { ProductsDoc } from './interface/products.inteface';
import { PRODUCTS_MODEL } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCTS_MODEL)
    private readonly ProductsModel: Model<ProductsDoc>,
    @InjectModel(CATEGORY_MODEL)
    private readonly CategoryModel: Model<CategoryDoc>,
    @InjectModel(FLASHSALES_MODEL)
    private readonly FlashsalesModel: Model<FlashSalesDoc>,
  ) {}

  async all(): Promise<ProductsDoc[]> {
    const product = this.ProductsModel.find()
      // .sort({ sellingprice: -1 })
      .populate({
        path: 'category',
        select: 'categoryname',
      })
      .populate({
        path: 'flashsales',
        select: ['flashSaleName', 'flashSaleQuantity', 'flashSaleDiscount'],
      });
    return product;
  }

  async getAllSortBySellingPrice(sort: number): Promise<ProductsDoc[]> {
    const product = this.ProductsModel.find()
      .sort({ sellingprice: sort })
      .populate({
        path: 'category',
        select: 'categoryname',
      })
      .populate({
        path: 'flashsales',
        select: ['flashSaleName', 'flashSaleQuantity', 'flashSaleDiscount'],
      });
    return product;
  }

  async getAllSortByDate(sort: number): Promise<ProductsDoc[]> {
    const product = this.ProductsModel.find()
      .sort({ createdAt: sort })
      .populate({
        path: 'category',
        select: 'categoryname',
      })
      .populate({
        path: 'flashsales',
        select: ['flashSaleName', 'flashSaleQuantity', 'flashSaleDiscount'],
      });
    return product;
  }

  async getProductByCategory(categoryname: string) {
    const category = await this.CategoryModel.findOne({
      categoryname: categoryname,
    });
    if (!category)
      throw new HttpException(
        'Category name does not exsist',
        HttpStatus.BAD_REQUEST,
      );
    // const product = await this.ProductsModel.find({
    //   category: category.id,
    // }).getFilter();
    // console.log(product);
    return this.ProductsModel.find({
      category: category.id,
    });
  }

  async getProductById(data: string): Promise<ProductsDoc> {
    if (data.match(/^[0 -9a-fA-F]{24}$/)) {
      const product = await this.ProductsModel.findOne({
        _id: data.match(/^[0 -9a-fA-F]{24}$/),
      }).populate({
        path: 'category',
        select: 'categoryname',
      });
      // .populate({ path: 'flashsales' });
      if (!product)
        throw new HttpException(
          'Product id does not exsist',
          HttpStatus.BAD_REQUEST,
        );
      return product;
    } else {
      const product_name = await this.ProductsModel.findOne({
        productName: data,
      });
      const product_code = await this.ProductsModel.findOne({
        productCode: data,
      });
      if (!product_code && !product_name)
        throw new HttpException(
          'Product does not exsist',
          HttpStatus.BAD_REQUEST,
        );
      if (product_code) return product_code;
      if (product_name) return product_name;
    }
  }

  async createProduct(
    createProductsDto: CreateProductsDto,
  ): Promise<ProductsDoc> {
    const { productName, productCode } = createProductsDto;
    const product_name = await this.ProductsModel.findOne({ productName });
    const product_code = await this.ProductsModel.findOne({ productCode });
    if (product_name)
      throw new HttpException('Product name exsisted', HttpStatus.BAD_REQUEST);
    if (product_code)
      throw new HttpException('Product code exsisted', HttpStatus.BAD_REQUEST);
    return (await this.ProductsModel.create(createProductsDto)).populate({
      path: 'category',
      select: 'categoryname',
    });
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    let sellingPriceAfterFlashSale: number;

    const { flashsales, category } = updateProductDto;
    const product = await this.ProductsModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (category) {
      const category_check = await this.CategoryModel.findOne({
        _id: category,
      });
      if (!category_check)
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    if (flashsales) {
      const flashsale_check = await this.FlashsalesModel.findOne({
        _id: flashsales,
      });
      if (!flashsale_check)
        throw new HttpException('Flash sale not found', HttpStatus.BAD_REQUEST);
      sellingPriceAfterFlashSale =
        product.sellingprice -
        (product.sellingprice * flashsale_check.flashSaleDiscount) / 100;
      if (!product)
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      const flashSaleQuantityAfterApply = flashsale_check.flashSaleQuantity - 1;
      console.log(flashsale_check.flashSaleQuantity);
      if (flashSaleQuantityAfterApply < 0)
        throw new HttpException(
          'There is no flash sale for this code left',
          HttpStatus.BAD_REQUEST,
        );
      const updated = await product.updateOne({
        ...updateProductDto,
        sellingprice: sellingPriceAfterFlashSale,
      });
      if (!updated)
        throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);

      const updateFlashSale = await flashsale_check.updateOne({
        flashSaleQuantity: flashSaleQuantityAfterApply,
      });
      if (!updateFlashSale)
        throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
      return {
        message: 'Update success',
      };
    }
    if (!product)
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const updated = await product.updateOne(updateProductDto);
    if (!updated)
      throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
    return {
      message: 'Update success',
    };
  }

  async deleteProductById(id: string) {
    const product = await this.ProductsModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!product)
      throw new HttpException('Product id not exsist', HttpStatus.BAD_REQUEST);
    const deleted = await product.deleteOne();
    if (!deleted)
      throw new HttpException('Deleting file error', HttpStatus.BAD_REQUEST);
    return {
      message: 'deleted',
    };
  }
}
