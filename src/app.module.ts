import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //esto sirve para poder servir archivos estáticos para esta ocasión el html5 y el css que se encuentra en la carpeta public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), //esto es para conectar a la base de datos de mongoDB

    // reccuerda que el comando para crearlo es "nest g res pokemon --no-spec"
    PokemonModule, CommonModule,
  ],
})
export class AppModule {}
