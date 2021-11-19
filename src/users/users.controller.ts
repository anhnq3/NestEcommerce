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
import { CreateUsersDto } from 'src/users/dto/users-create.dto';
import { UpdateUserDto } from './dto/users-update.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @ApiOperation({ summary: 'Get all user' })
  @HttpCode(HttpStatus.OK)
  @Get()
  all() {
    return this.usersService.all();
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Registing an user' })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() creatUsersDto: CreateUsersDto) {
    return this.usersService.register(creatUsersDto);
  }

  // @ApiTags('Users')
  // @ApiOperation({ summary: 'Login an user' })
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // async login(@Body() loginUserDto: LoginUserDto) {
  //   return this.usersService.login(loginUserDto);
  // }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Delete an user by admin' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Update an user' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Verify account' })
  @HttpCode(HttpStatus.OK)
  @Get('/tok/:token')
  async verify(@Param('token') token: string) {
    return this.usersService.verify(token);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Checks admin' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async isAdmin(@Param('id') id: string) {
    return this.usersService.isAdmin(id);
  }
}
