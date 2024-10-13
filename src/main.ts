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
      //esto es para transformar dtos en valores a usar ejemplo queryparams de strings a numbers, no es lo mejor al usar distintas instancias
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // se puede inyectar directamente el .env ya que no esta dentro de un modulo de node o nest por lo que es necesitarlo tenerlo bien definido en el archivo .env
  await app.listen(process.env.PORT);
}
bootstrap();
