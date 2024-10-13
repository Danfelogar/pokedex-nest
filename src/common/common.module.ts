import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
// se provee el axios para poder usar ya que es un provider y esta a nivel de modulo en nest para que sea visible en otros modulos
@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
