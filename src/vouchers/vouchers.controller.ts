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
import { CreateVoucherDto } from './dto/voucher-create.dto';
import { UpdateVoucherDto } from './dto/voucher-update.dto';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly voucherService: VouchersService) {}

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Get all voucher' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  getAll() {
    return this.voucherService.all();
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Get voucher by Id' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getVoucherById(@Param('id') id: string) {
    return this.voucherService.getVoucherById(id);
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Add a voucher' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  createVoucher(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.createVoucher(createVoucherDto);
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Update a voucher' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id')
  updateVoucher(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return this.voucherService.updateVoucherByid(id, updateVoucherDto);
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Delete a voucher' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  deleteVoucher(@Param('id') id: string) {
    return this.voucherService.deleteVoucherById(id);
  }
}
