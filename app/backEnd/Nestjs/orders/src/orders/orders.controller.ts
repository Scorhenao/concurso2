import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { CreateOrderDto } from './dto/create-order.dto';
import { errorManage } from 'src/config/error/error.manage';
import {Server} from 'socket.io';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersGuard } from './guard/orders.guard';
import { log } from 'console';
@Controller()
export class OrdersController {
  server:Server
  
  constructor(private readonly ordersService: OrdersService) {}


  @UseGuards(OrdersGuard)
  @Post("orders")
  create(@Body() data2:any) {
    try {
      console.log("hola entrmaos y el usuario esta autorizado");
      
      //const createData = this.ordersService.create(data2);
      return "hola";
    } catch (err: any) {
      throw new errorManage({
        type: 'BAD_REQUEST',
        message: 'not cant create user',
      });
    }
  }
}
