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
import { CreateFlashSaleDto } from './dto/flashsales-create.dto';
import { UpdateFlashSaleDto } from './dto/flashsales-update.dto';
import { FlashsalesService } from './flashsales.service';

@Controller('flashsales')
export class FlashsalesController {
  constructor(private readonly flashSaleService: FlashsalesService) {}

  @ApiTags('Flash sale')
  @ApiOperation({ summary: 'Get all flash sale' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  getAll() {
    return this.flashSaleService.all();
  }

  @ApiTags('Flash sale')
  @ApiOperation({ summary: 'Add a flash sale' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  createFlashSale(@Body() createFlashSaleDto: CreateFlashSaleDto) {
    return this.flashSaleService.createFlashSale(createFlashSaleDto);
  }

  @ApiTags('Flash sale')
  @ApiOperation({ summary: 'Get flash sale by id' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  async getFlashSaleById(@Param('id') id: string) {
    return this.flashSaleService.findFlashSaleById(id);
  }

  @ApiTags('Flash sale')
  @ApiOperation({ summary: 'Delete flash sale by id' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteFlashSaleById(@Param('id') id: string) {
    return this.flashSaleService.deleteFlashSaleById(id);
  }

  @ApiTags('Flash sale')
  @ApiOperation({ summary: 'Update flash sale by id' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateFlashsaleById(
    @Param('id') id: string,
    @Body() updateFlashsaleDto: UpdateFlashSaleDto,
  ) {
    return this.flashSaleService.updateFlashSaleByID(id, updateFlashsaleDto);
  }
}
