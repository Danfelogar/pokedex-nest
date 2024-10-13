import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  //con esto se aplica a nivel global el pipe de validación es decir a todos los controladores
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist solo deja la data que se espera en el DTO si hay mas data de la requerida la elimina
      whitelist: true,
      //forbidNonWhitelisted si hay data que no se espera me tiene que retornar error para que en las peticiones no se mande basura
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
