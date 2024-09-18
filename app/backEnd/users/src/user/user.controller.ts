import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrsFilter } from 'src/common/config/exception/errs.filter';
import { roles } from 'src/common/decorator/decorator.decorator';
import { roleGuard } from 'src/common/guards/guards.guard';
import { apiKeyGuard } from 'src/common/guards/apiKey.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @roles("admin","client")
  @UseGuards(apiKeyGuard,roleGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Post('userOne')
  @UseGuards(apiKeyGuard)
  async findOne(@Body() dataUser:any) {
    try{
      console.log("entramos a encontrar");
      console.log(dataUser);
      
    return await this.userService.findOne(dataUser);
    }catch(err:any){
      throw err;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
