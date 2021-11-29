import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { FlashSalesDoc } from 'src/flashsales/interface/flashsale.interface';
import { FLASHSALES_MODEL } from 'src/flashsales/schema/flashsales.schema';
import { ProductsDoc } from 'src/products/interface/products.inteface';
import { PRODUCTS_MODEL } from 'src/products/schema/products.schema';
import { sendEmail } from 'src/users/helper/sendmail';
import { UsersDoc } from 'src/users/interface/users.interface';
import { USERS_MODEL } from 'src/users/shcema/users.schema';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(FLASHSALES_MODEL)
    private readonly FlashSalesModel: Model<FlashSalesDoc>,
    @InjectModel(PRODUCTS_MODEL)
    private readonly ProductsModel: Model<ProductsDoc>,
    @InjectModel(USERS_MODEL)
    private readonly UsersModel: Model<UsersDoc>,
  ) {}

  // @Cron('* * * * * *')
  // async checkdate() {
  // if (
  //   new Date(Date.now()).getDate() == new Date('2021-11-25').getDate() &&
  //   new Date(Date.now()).getMonth() == new Date('2021-11-25').getMonth()
  // )
  //   console.log('equal');
  // const flashsale = await this.FlashSalesModel.find();
  // for (let i = 0; i < flashsale.length; i++) {
  //   if (
  //     flashsale[i].flashSaleEndDate ==
  //     new Date('Thu Nov 25 2021 09:46:42 GMT+0700 (Indochina Time)')
  //   ) {
  //     console.log(
  //       `${flashsale[i].flashSaleEndDate} > ${new Date(Date.now())}`,
  //     );
  //   }
  // }
  // }

  @Cron('* * * 0 * *')
  async checkFlashSaleDate() {
    const flashsale = await this.FlashSalesModel.find();
    for (let i = 0; i < flashsale.length; i++)
      // If flashsale expired
      if (flashsale[i].flashSaleEndDate < new Date(Date.now())) {
        // get flashsale id
        const id = flashsale[i]._id;
        const percent = flashsale[i].flashSaleDiscount;
        // check product has that id
        const productHasExpiredFlashSale = await this.ProductsModel.find({
          _id: id,
        });
        if (productHasExpiredFlashSale) {
          for (let j = 0; j < productHasExpiredFlashSale.length; j++) {
            await flashsale[i].updateOne({ flashSaleStatus: 'inactive' });
            const sellingPrice =
              (productHasExpiredFlashSale[j].sellingprice / (100 - percent)) *
              100;
            await productHasExpiredFlashSale[i].updateOne({
              sellingprice: sellingPrice,
            });
            await flashsale[i].deleteOne();
          }
        }
      } else {
        // This is the place where to notify at 12h
        if (
          flashsale[i].flashSaleStartDate.getDate() ==
            new Date(Date.now()).getDate() &&
          flashsale[i].flashSaleStartDate.getMonth() ==
            new Date(Date.now()).getMonth()
        ) {
          const users = await this.UsersModel.find();
          const htmlTemplate = `-----------------THERE IS A FLASHSALE TODAY-----------------
          Let's check flash sale today for more detail at: http://localhost:3000/products`;
          for (let i = 0; i < users.length; i++) {
            // let userEmail = users[i].email;
            sendEmail(
              'anhnq3@vmodev.com',
              // userEmail,
              'There is a flash sale on website',
              htmlTemplate,
            );
          }

          // console.log(`It's flash sale: "${flashsale[i].flashSaleName}" time`);
        }
      }
  }
}
