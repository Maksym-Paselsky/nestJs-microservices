import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://odqxkjxu:4d8qjTb48baoMxj9dygTehTgUfdxqC7M@sparrow.rmq.cloudamqp.com/odqxkjxu',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
