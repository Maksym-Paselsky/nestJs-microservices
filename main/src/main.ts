import { NestFactory } from '@nestjs/core';
import { set } from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  await app.listen(8001);
}
bootstrap();
