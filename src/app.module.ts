import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      //esto es para que cargue las variables de entorno desde el archivo que se le asigna
      load: [EnvConfiguration],
      //esto es para que valide las variables de entorno con el esquema de validación que se le asigna joi y mi envConfiguration pueden trabajar en conjunto porque uno valida y el otro carga las variables de entorno pero las configuraciones de JoiValidation se activan primero que las de EnvConfiguration
      validationSchema: JoiValidationSchema,
    }), //esto es para poder usar las variables de entorno recordar que es necesario tener un archivo .env en la raíz del proyecto y que esta configuración este al inicio de las lineas de importaciones

    //esto sirve para poder servir archivos estáticos para esta ocasión el html5 y el css que se encuentra en la carpeta public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), //esto es para conectar a la base de datos de mongoDB
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsdb', //esto es para que se conecte a la base de datos que se le asigna  en este caso a la base de datos pokemonsdb de mongoDB en producción aplicamos esto ,
    }), //esto es para conectar a la base de datos de mongoDB

    // reccuerda que el comando para crearlo es "nest g res pokemon --no-spec"
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    // console.log(process.env);
  }
}
