import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configureService=app.get(ConfigService);
  app.use(cookieParser(configureService.get<string>("SIGNED_COOKIE")));
  await app.listen(3000);
}
bootstrap();
