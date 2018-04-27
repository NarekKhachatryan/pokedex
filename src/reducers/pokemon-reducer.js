import * as POKEMONS from '../actions/pokemon/type';

export const getPokemons = (state = {}, action) => {
  switch (action.type) {
    case POKEMONS.GET_POKEMONS_SUCCESS:
      return { ...state, list: action.data };
    case POKEMONS.GET_POKEMONS_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const getPokemon = (state = {}, action) => {
  switch (action.type) {
    case POKEMONS.GET_POKEMON_SUCCESS:
      return { ...state, list: action.data };
    case POKEMONS.GET_POKEMON_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const getPokemonType = (state = {}, action) => {
  switch (action.type) {
    case POKEMONS.GET_POKEMONS_TYPE_SUCCESS:
      return { ...state, list: action.data };
    case POKEMONS.GET_POKEMONS_TYPE_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const loading = (state = {}, action) => {
  switch (action.type) {
    case POKEMONS.LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};