import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Between, Repository } from 'typeorm';
import {map} from 'rxjs/operators';
import { errorManage } from 'src/config/error/error.manage';


@Injectable()
export class OrdersService {
  private date=new Date();
  private dateToday:any=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`;

  constructor(
    private httpService: HttpService,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(dataOrder: any) {
    try{
      console.log(Date.now());
  
    let quantityOfDrinks=0;
    let quantityOfDished=0;
    let dishes=[];
    let drinks=[];
    
    for(let x of dataOrder.ORDER.DISHES){
      quantityOfDished++;
      dishes.push(x.NAMEDISH);
    }
    for(let p of dataOrder.ORDER.DRINKS){
      quantityOfDrinks++;
      drinks.push(p.NAMEDRINK);
    }


    
    const dataCreate =this.orderRepository.create({
      quantityOfDrinks:quantityOfDrinks,
      quantityOfPlates:quantityOfDished,
      quantityOfPeoples:dataOrder.ORDER.QUANTITYPEOPLE,
      dishes:dishes,
      drinks:drinks,
      Table:dataOrder.ORDER.TABLE,
      name:dataOrder.name,
      idUser:dataOrder.idUser,
      data:this.dateToday,
    });  
    
    const results=this.orderRepository.create(dataCreate);
    await this.orderRepository.save(results);
    return results;
    }catch(err:any){
      throw new err;
    }
  }

  async assignTable(combinedData: any) {
    const { quantityOfPersons, tables } = combinedData;
    return tables.find(table => table.disponibility && table.quantityOfChairs >= quantityOfPersons);
  }


  async returnOrdersDay(){
    try{
      
      const dateInitial=new Date(`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()-1}`);
      const dateFinal=new Date();
      
      dateInitial.setHours(this.date.getHours(),0,0,0);
      dateFinal.setHours(this.date.getHours(),0,0,0);

      console.log("fecha inicio");
      console.log(this.date.getHours());
      
      console.log(dateInitial);
      

      console.log("fecha final");
      
      console.log(dateFinal);
      
      
      const dataOrders=await this.orderRepository.find({
        where:{
          data:Between (dateInitial,dateFinal)
        }
      });
   

      if(!dataOrders){
        throw new errorManage({
          type:"NOT_FOUND",
          message:"there is not orders today"
        });
      }
      return dataOrders;
    }catch(err:any){
      throw errorManage.errorManageController(err.message);
    }
  }
  // async createOrder(orderData: any) {
  //   // Implementar la lógica para crear una orden
  //   return { success: true, order: orderData }; // Simulando una respuesta
  // }
}
