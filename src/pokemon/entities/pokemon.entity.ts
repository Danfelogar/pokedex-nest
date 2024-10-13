import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// las entidades son clases que representan tablas en la base de datos si se extiende de Document añade la propiedad id y demas propiedades un documento de mongoDB
@Schema()
export class Pokemon extends Document {
  // id: string;
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
