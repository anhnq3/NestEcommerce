import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlashSaleDto } from './dto/flashsales-create.dto';
import { UpdateFlashSaleDto } from './dto/flashsales-update.dto';
import { FlashSalesDoc } from './interface/flashsale.interface';
import { FLASHSALES_MODEL } from './schema/flashsales.schema';

@Injectable()
export class FlashsalesService {
  constructor(
    @InjectModel(FLASHSALES_MODEL)
    private readonly FlashSalesModel: Model<FlashSalesDoc>,
  ) {}

  async all(): Promise<FlashSalesDoc[]> {
    return await this.FlashSalesModel.find();
  }

  async findFlashSaleById(id: string): Promise<FlashSalesDoc> {
    const flashsale = await this.FlashSalesModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!flashsale)
      throw new HttpException('Flash sale not exists', HttpStatus.BAD_REQUEST);
    return flashsale;
  }

  async createFlashSale(
    createFlashSaleDto: CreateFlashSaleDto,
  ): Promise<FlashSalesDoc> {
    const { flashSaleName } = createFlashSaleDto;
    const flashsale = await this.FlashSalesModel.findOne({ flashSaleName });
    if (flashsale)
      throw new HttpException(
        'Flash sale name has exsisted',
        HttpStatus.BAD_REQUEST,
      );
    return await this.FlashSalesModel.create(createFlashSaleDto);
  }

  async deleteFlashSaleById(id: string) {
    const flashsale = await this.FlashSalesModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!flashsale)
      throw new HttpException('Flash sale not exists', HttpStatus.BAD_REQUEST);
    const deleteFlashSale = await flashsale.deleteOne();
    if (deleteFlashSale)
      return {
        message: 'deleted',
      };
  }

  async updateFlashSaleByID(
    id: string,
    updateFlashSaleDto: UpdateFlashSaleDto,
  ) {
    const flashsale = await this.FlashSalesModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!flashsale)
      throw new HttpException('Flash sale not exists', HttpStatus.BAD_REQUEST);
    const { flashSaleName } = updateFlashSaleDto;
    const checkNameExists = await this.FlashSalesModel.findOne({
      flashSaleName,
    });
    if (checkNameExists)
      throw new HttpException('Flash sale name exists', HttpStatus.BAD_REQUEST);

    const updated = await flashsale.update(updateFlashSaleDto);
    if (!updated)
      throw new HttpException('Not updated', HttpStatus.BAD_REQUEST);
    return {
      message: 'Updated',
    };
  }
}
