import { MomentModule } from '@ccmos/nestjs-moment';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema, USERS_MODEL } from './shcema/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USERS_MODEL, schema: UsersSchema }]),
    MomentModule.forRoot({
      tz: 'Asia/Ho_Chi_Minh', //tz: 'Asia/Taipei',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
