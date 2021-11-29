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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/helper/jwt-auth.guard';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiTags('Order')
  @ApiOperation({ summary: 'Get all orders' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  // Bearer co lien quan
  @ApiBearerAuth()
  @Get()
  getAll() {
    return this.orderService.all();
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Get order by Id' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  // Bearer co lien quan
  @ApiBearerAuth()
  @Get(':id')
  getOrderById(@Param('id') id: Schema.Types.ObjectId) {
    return this.orderService.getOrderById(id);
  }

  // Missing create check is product lower than 0
  // Missing create order then - in product
  // This is eazier than update cus just need to solve adding without put out of cart
  @ApiTags('Order')
  @ApiOperation({ summary: 'Create an order' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  // Bearer co lien quan
  @ApiBearerAuth()
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Delete an order' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  // Bearer co lien quan
  @ApiBearerAuth()
  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  // Missing check is product lower than 0
  @ApiTags('Order')
  @ApiOperation({ summary: 'Update quantity' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  // Bearer co lien quan
  @ApiBearerAuth()
  @Put(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }
}
