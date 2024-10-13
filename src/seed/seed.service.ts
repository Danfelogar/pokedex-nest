import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  //otra forma
  // constructor(private readonly PokemonService: PokemonService) {}
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  // se hace un axios instance para no crear una dependencia oculta dentro de la fusion/methods de la clase y poder mockearlo
  // private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    //manera #1 para optimizar la subida de datos a la base de datos
    await this.pokemonModel.deleteMany({}); // esto es igual al delete * from pokemon

    const data = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    //manera #2 para optimizar la subida de datos a la base de datos
    const pokemonToInsert: { name: string; no: number }[] = [];
    //manera #1 para optimizar la subida de datos a la base de datos
    // const insertPromisesArray = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // this.PokemonService.create({
      //   name,
      //   no,
      // });

      // await this.pokemonModel.create({ name, no });

      //manera #1 para optimizar la subida de datos a la base de datos
      // insertPromisesArray.push(this.pokemonModel.create({ name, no }));
      // await Promise.all(insertPromisesArray);

      //manera #2 para optimizar la subida de datos a la base de datos
      pokemonToInsert.push({ name, no }); // [{name: bulbasaur, no:1},...]
    });

    //manera #2 para optimizar la subida de datos a la base de datos
    await this.pokemonModel.insertMany(pokemonToInsert); // esto hace insert into pokemons (name, no)[] en una sola petición a la base de datos
    return `successfully seeded ${data.results.length} pokemons`;
  }
}
