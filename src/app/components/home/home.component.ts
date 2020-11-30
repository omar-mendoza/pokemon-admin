import { Component, OnInit } from '@angular/core';
import { IError } from 'src/app/interfaces/IError';
import { IPokedex } from 'src/app/interfaces/IPokedex';
import { IPokemon } from 'src/app/interfaces/IPokemon';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokedex: IPokedex | any = {};
  pokemones: IPokemon | any = {};

  pageMisPokemones = 0;
  pagePokemones = 0;
  pageSize = 5;

  totalRecordsPokemones = 1117;
  totalRecords= 2;

  loadingMisPokemones = true;
  loadingPokemones = true;


  constructor(private pokemonService: PokemonDataService) { }

  ngOnInit(): void {}

  async loadMisPokemones(event?: any) {

    if(event && event.first) {
      this.pageMisPokemones = (event.first/this.pageSize)
    } else {
      this.pageMisPokemones = 0;
    }
    
    let misPokemones = await this.pokemonService.getPokedex();

    if(this.isError(misPokemones)) {
      console.log('Error al obtener los datos de mis pokemones');
      return;
    }

    this.pokedex = misPokemones;

    this.loadingMisPokemones = false;

  }

  async loadPokemones(event?: any) {
    this.loadingPokemones = true;
    if(event && event.first) {
      this.pagePokemones = (event.first/this.pageSize)
    } else {
      this.pagePokemones = 0;
    }
    let pokemones_ = await this.pokemonService.getPokemones(this.pagePokemones, this.pageSize);

    if(this.isError(pokemones_)) {
      console.log('Error al obtener los datos de los pokemones');
      return;
    }

    this.pokemones = pokemones_;
    this.loadingPokemones = false;

  }

  agregar(pokemon: IPokemon) {
    console.log('agregando pokemon', pokemon);
  }

  editar(pokemon: IPokemon) {
    console.log('editando pokemon', pokemon);
  }


  eliminar(pokemon: IPokemon) {
    console.log('eliminando pokemon', pokemon);
  }

  salir() {
    console.log('Saliendo de sesión');
  }

  isError(object: any): object is IError {
    return 'error' in object;
  }



}
