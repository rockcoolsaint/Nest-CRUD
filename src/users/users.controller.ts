import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // get one user
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }

  // create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  // update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }

  // delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    // handle the error if user not found
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.usersService.delete(id);
  }
}
