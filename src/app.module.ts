import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { VouchersController } from './vouchers/vouchers.controller';
import { FlashsalesController } from './flashsales/flashsales.controller';
import { FlashsalesModule } from './flashsales/flashsales.module';
import { VouchersModule } from './vouchers/vouchers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        useNewUrlParser: true,
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoryModule,
    FlashsalesModule,
    VouchersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
