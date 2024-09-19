import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { dishesSeed } from './config/seeds/seed.typeDishes';
//import { DataSource } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const dataSource = app.get(DataSource);
 // const seederTypes = new dishesSeed();
 // await seederTypes.seed(dataSource);
 app.enableCors();
 const configureService=app.get(ConfigService);
 
 app.use(cookieParser(configureService.get<string>("SIGNED_COOKIE"))); 
 app.enableCors({
   origin: '*', // Permite solicitudes desde cualquier origen
   credentials: true, // Permite el envío de cookies
 });

  await app.listen(3004);
}
bootstrap();
