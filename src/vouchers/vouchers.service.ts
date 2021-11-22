import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVoucherDto } from './dto/voucher-create.dto';
import { UpdateVoucherDto } from './dto/voucher-update.dto';
import { VoucherDoc } from './interface/voucher.interface';
import { VOUCHERS_MODEL } from './schema/vouchers.schema';

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(VOUCHERS_MODEL)
    private readonly VoucherModel: Model<VoucherDoc>,
  ) {}

  async all(): Promise<VoucherDoc[]> {
    return await this.VoucherModel.find();
  }

  async getVoucherById(id: string): Promise<VoucherDoc> {
    const voucher = await this.VoucherModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!voucher)
      throw new HttpException('Voucher not exists', HttpStatus.BAD_REQUEST);
    return voucher;
  }

  async findVoucherByID(id: string): Promise<VoucherDoc> {
    const voucher = await this.VoucherModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!voucher)
      throw new HttpException('Voucher not exists', HttpStatus.BAD_REQUEST);
    return voucher;
  }

  async createVoucher(createVoucherDto: CreateVoucherDto): Promise<VoucherDoc> {
    const { voucherName } = createVoucherDto;
    const voucher = await this.VoucherModel.findOne({ voucherName });
    if (voucher)
      throw new HttpException(
        'Voucher name has existed',
        HttpStatus.BAD_REQUEST,
      );
    return await this.VoucherModel.create(createVoucherDto);
  }

  async updateVoucherByid(id: string, updateVoucherDto: UpdateVoucherDto) {
    const voucher = await this.VoucherModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!voucher)
      throw new HttpException('Voucher not exists', HttpStatus.BAD_REQUEST);
    const { voucherName } = updateVoucherDto;
    const checkNameExists = await this.VoucherModel.findOne({
      voucherName,
    });
    if (checkNameExists)
      throw new HttpException('Voucher name exists', HttpStatus.BAD_REQUEST);

    const updated = await voucher.update(updateVoucherDto);
    if (!updated)
      throw new HttpException('Not updated', HttpStatus.BAD_REQUEST);
    return {
      message: 'Updated',
    };
  }

  async deleteVoucherById(id: string) {
    const voucher = await this.VoucherModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!voucher)
      throw new HttpException('Voucher not exists', HttpStatus.BAD_REQUEST);
    const deleteVoucher = await voucher.deleteOne();
    if (deleteVoucher)
      return {
        message: 'deleted',
      };
  }
}
