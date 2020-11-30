import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { IError } from '../interfaces/IError';
import { IPokedex } from '../interfaces/IPokedex';
import { IPokemon } from '../interfaces/IPokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  url = 'http://192.168.1.66:8080/pokemon/api';

  constructor(private http: HttpClient) { }

  async getPokedex(): Promise<IError | IPokedex> {

    const error: IError = { error: true, msj: 'Error al obtener la pokedex' }
    let pokedex: IError | IPokedex = error;

    const url = `${this.url}/user`;

    await this.http.get<IPokedex>(url).toPromise().then(res => {
      console.log(res);
      pokedex = res;
      if(pokedex.pokemones) {
        pokedex.pokemones.map(e => this.toDataURL(e.urlImagen as string, (res: any) => e.base64Imagen = res ))
      }

    }).catch(err => console.log(err))

    return pokedex;
  }

  async getPokemones(page: number, size: number): Promise<IError | IPokemon[]> {

    const error: IError = { error: true, msj: 'Error al obtener la pokemones' }
    let pokemones: IError | IPokemon[] = error;

    const url = `${this.url}/all?page=${page}&size=${size}`;
    await this.http.get<IPokemon[]>(url).toPromise().then(res => {
      console.log(res);
      pokemones = res;

      pokemones.map(e => this.toDataURL(e.urlImagen as string, (res: any) => e.base64Imagen = res ))

    }).catch(err => console.log(err))

    return pokemones;
  }

  toDataURL(url: string, callback: any) {
    if(url == null) return;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}