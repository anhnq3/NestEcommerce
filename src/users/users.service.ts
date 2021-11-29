import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto } from 'src/users/dto/users-create.dto';
import { UsersDoc } from './interface/users.interface';
import { USERS_MODEL } from './shcema/users.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/users-update.dto';
import { sendEmail } from 'src/users/helper/sendmail';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { checkExpired } from './helper/checkExpired';

@Injectable()
export class UsersService {
  constructor(
    // This is to decalre a UsersDoc
    @InjectModel(USERS_MODEL)
    private readonly usersModel: Model<UsersDoc>,
  ) {}

  async all(): Promise<UsersDoc[]> {
    return this.usersModel.find({});
  }

  // async register(createUsersDto: CreateUsersDto): Promise<UsersDoc> {
  async register(createUsersDto: CreateUsersDto): Promise<UsersDoc> {
    const { username, email, password } = createUsersDto;

    const userExisted = await this.usersModel.findOne({ username });
    const emailExisted = await this.usersModel.findOne({ email });
    if (!!userExisted || !!emailExisted) {
      throw new HttpException(
        'User name or email has existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const hashed = await bcrypt.hash(password, 10);
    // password = hashed;

    const token = crypto.randomBytes(32).toString('hex');
    const htmlTemplate = `
      -----------------------------VERIFY YOUR PASSWORD-----------------------------
      Please click here to verify your user(${username}):   http://localhost:3000/users/tok/${token}
      `;
    sendEmail('anhnq3@vmodev.com', 'Verify your account', htmlTemplate);
    // sendEmail(email, 'Verify your account', htmlTemplate);

    return await this.usersModel.create({
      ...createUsersDto,
      password: password,
      token: token,
      tokenSubject: 'verify',
      tokenExpires: moment().add(30, 'minutes').toDate(), // 6000 is 1 minute
      // tokenExpires: new Date(Number(Date.now() + 60000 * 30)), // 6000 is 1 minute
    });
  }

  async deleteUser(id: string): Promise<any> {
    const check = await this.usersModel.findOne({ _id: id });
    if (!check) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }
    await this.usersModel.findOneAndRemove({ _id: id });
    return {
      message: 'Delete succes',
    };
  }

  // Check again
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const { password } = updateUserDto;
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }
    if (password) {
      const hashed = await bcrypt.hash(updateUserDto['password'], 10);
      updateUserDto['password'] = hashed;
    }

    await user.updateOne({ ...updateUserDto });
    return {
      message: 'Update success',
    };
  }

  async verify(token: string): Promise<any> {
    const user = await this.usersModel.findOne({ token });
    if (!user) {
      throw new HttpException('Token not found', HttpStatus.BAD_GATEWAY);
    }
    const expiredDate = user.tokenExpires;
    if (checkExpired(expiredDate))
      throw new HttpException('Token has been expired', HttpStatus.BAD_GATEWAY);

    await user.updateOne({
      token: '',
      tokenSubject: '',
      tokenExpires: new Date(0),
      verify: true,
    });
    return {
      message: 'Verify success',
    };
  }

  async isAdmin(id: string): Promise<any> {
    const user = await this.usersModel.findOne({
      _id: id.match(/^[0 -9a-fA-F]{24}$/),
    });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_GATEWAY);
    return {
      id: id,
      isAdmin: user.isAdmin,
    };
  }
}
