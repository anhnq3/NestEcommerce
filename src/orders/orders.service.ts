import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { ProductsDoc } from 'src/products/interface/products.inteface';
import { PRODUCTS_MODEL } from 'src/products/schema/products.schema';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';
import { OrdersDoc } from './interface/order.interface';
import { ORDERS_MODEL } from './schema/orders.schema';

@Injectable()
export class OrdersService {
  @InjectModel(ORDERS_MODEL)
  private readonly OrdersModel: Model<OrdersDoc>;

  @InjectModel(PRODUCTS_MODEL)
  private readonly ProductsModel: Model<ProductsDoc>;

  async all(): Promise<OrdersDoc[]> {
    const orders = await this.OrdersModel.find().populate({
      path: 'products',
      select: ['productName', 'quantity', 'weight'],
    });
    return orders;
  }

  async getOrderById(id: Schema.Types.ObjectId): Promise<OrdersDoc> {
    const order = await this.OrdersModel.findOne({ _id: id }).populate({
      path: 'products',
      select: ['productName', 'quantity', 'weight'],
    });
    if (!order)
      throw new HttpException('Order not found', HttpStatus.BAD_REQUEST);
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    const { products, quantity } = createOrderDto;
    const checkProduct = await this.ProductsModel.findOne({ _id: products });
    if (!checkProduct)
      throw new HttpException('Product not exists', HttpStatus.BAD_REQUEST);

    // Check if product quantity not enough then end
    if (checkProduct.quantity < quantity)
      throw new HttpException(
        `Product quantity not enough: ${checkProduct.quantity}`,
        HttpStatus.BAD_REQUEST,
      );
    const minusProductQuantity = checkProduct.quantity - quantity;
    const updateProductAfterOrder = await checkProduct.updateOne({
      quantity: minusProductQuantity,
    });
    if (!updateProductAfterOrder)
      throw new HttpException(
        'Update product quantity after order failed',
        HttpStatus.BAD_REQUEST,
      );
    // Check is after add products quantity is 0
    // Then return error
    const price: number = checkProduct.sellingprice;
    const total: number = price * quantity;

    const checkProductExistsInOrder = await this.OrdersModel.findOne({
      products,
    });
    // If product have in order then update quantity, product price(if flash sale deleted) and total
    if (checkProductExistsInOrder) {
      const updateQuantity: number =
        checkProductExistsInOrder.quantity + quantity;
      const updatePrice: number = price;
      const updateTotal: number = updatePrice * updateQuantity;
      const updateOrder = await checkProductExistsInOrder.updateOne({
        quantity: updateQuantity,
        total: updateTotal,
        price: updatePrice,
      });
      // Minus product quantity when adding in cart

      if (!updateOrder)
        throw new HttpException('Order failed', HttpStatus.BAD_REQUEST);

      // Handle product quantity when update
      return {
        products: products,
        price: updatePrice,
        quantity: updateQuantity,
        total: updateTotal,
      };
    }
    const update = await this.OrdersModel.create({
      ...createOrderDto,
      price,
      total,
    });
    //Minus product quantity when adding in cart

    return update;
  }

  async deleteOrder(id: string) {
    try {
      const order = await this.OrdersModel.findByIdAndDelete(id);
      if (!order)
        throw new HttpException('Order not exists', HttpStatus.BAD_REQUEST);
      return {
        message: 'delete success',
      };
    } catch (err) {
      return {
        message: 'Delete failed',
        error: err,
      };
    }
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const { quantity } = updateOrderDto;
    const checkOrder = await this.OrdersModel.findById(id);
    const productId = checkOrder.products;
    const checkProduct = await this.ProductsModel.findById(productId);
    const updatePrice = checkProduct.sellingprice;
    const updateTotal = updatePrice * quantity;
    if (!checkOrder)
      throw new HttpException('Order not exists', HttpStatus.BAD_REQUEST);
    // Handle product quantity when update

    const oldQuantity = checkOrder.quantity;
    if (quantity == oldQuantity)
      return {
        message: 'Still the same',
      };
    if (quantity < oldQuantity)
      await checkProduct.updateOne({
        quantity: checkProduct.quantity + (oldQuantity - quantity),
      });
    if (quantity > oldQuantity)
      await checkProduct.updateOne({
        quantity: checkProduct.quantity - (quantity - oldQuantity),
      });

    if (checkProduct.quantity <= 0)
      throw new HttpException('Product out off stock', HttpStatus.BAD_REQUEST);

    await checkOrder.updateOne({
      price: updatePrice,
      total: updateTotal,
      quantity: quantity,
    });
    return {
      message: 'Updated',
    };
  }
}
