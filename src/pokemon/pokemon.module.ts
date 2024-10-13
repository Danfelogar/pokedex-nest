import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    //necesario para poder usar las variables de entorno en el modulo pokemon
    ConfigModule,
    // esto es para conectar a la base de datos de mongoDB y poder grabar o guardar pokemon en la base de datos
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [PokemonService, MongooseModule],
})
export class PokemonModule {}
