import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

//este decorador es para inyectarlo en el servicio
@Injectable()
export class AxiosAdapter implements HttpAdapter {
  // se hace un axios instance para no crear una dependencia oculta dentro de la fusion/methods de la clase y poder mockearlo
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);

      return data;
    } catch (error) {
      console.error({ error });
      throw new Error('This is an error - Check logs');
    }
  }
}
