import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  // pokemonModel es una instancia de la clase Model de mongoose que se encarga de interactuar con la base de datos
  constructor(
    // este decorador de inyección de dependencias se encarga de inyectar la dependencia de la clase Model de mongoose para poder interactuar con la base de datos
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error, 'create');
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    // limit para limitar la data y skip para pasar de un numero determinado a otro
    return this.pokemonModel.find().limit(limit).skip(offset);
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //MongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with term(id/name/no) ${term} not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      // el new indica que se devuelva el documento actualizado y si no lo tuviera se regresa el documento antes de ser actualizado
      await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });
    } catch (error) {
      this.handleExceptions(error, 'update');
      // console.error({ error });
      // // importante los valores en la base de datos están indexados por lo que si se intenta guardar un valor que ya existe en la base de datos se lanzará un error con el código 11000
      // if (error.code === 11000) {
      //   throw new BadRequestException(
      //     `This data already registered in the database ${JSON.stringify(error.keyValue)}`,
      //   );
      // }

      // throw new InternalServerErrorException(
      //   `Can't update pokemon - check server logs`,
      // );
    }
    // con esto me aseguro de mostrar en la respuesta que se actualizó el pokemon con los datos nuevos pokemon.toJSON() es para convertir el documento de mongoose a un objeto de javascript y luego con el spread operator se unen los datos del objeto pokemon y los datos del objeto updatePokemonDto
    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    //esto consulta el documento en la base de datos y lo elimina pero no valida si el documento existe o no
    // const result = this.pokemonModel.findByIdAndDelete(id);
    // con esto se valida si el documento existe o no y se elimina
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    return;
  }

  private handleExceptions(error: any, action: string) {
    console.error({ error });
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't ${action} pokemon - Check server logs`,
    );
  }
}
