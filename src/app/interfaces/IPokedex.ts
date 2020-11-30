import { IPokemon } from './IPokemon';

export interface IPokedex {
    numeroPokedex?: number;
    nombrePokedex?: string;
    nombreUsuario?: string;
    aliasUsuario?:  string;
    pokemones?:     IPokemon[];
}
