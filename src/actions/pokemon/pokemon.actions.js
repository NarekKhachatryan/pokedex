import axios from 'axios';
import * as POKEMONS from './type';

const baseURL = 'https://pokeapi.co/api/v2/';
export const getPokemons = (limit = 10, offset) => {
  return dispatch => {
    dispatch({ type: POKEMONS.LOADING, loading: true });
    axios.get(baseURL + `pokemon`,
    {
      params: {
        limit: limit,
        offset: offset
      }
    }
  ).then((response) => {
      let { count, results } = response.data;
      Promise.all(results.map(pokemon => {
        return axios.get(pokemon.url)
          .then(response => {
            let { id, name, types, sprites } = response.data;
            let pokemon = { id, avatar: sprites.front_default, name, types };
            return pokemon;
          });
      }))
        .then(response => {
          let responsePokemons = { 'count': count, 'list': response }
          dispatch({ type: POKEMONS.GET_POKEMONS_SUCCESS, data: responsePokemons });
          dispatch({ type: POKEMONS.LOADING, loading: false });
        })

    })
      .catch((err) => {
        dispatch({ type: POKEMONS.GET_POKEMONS_FAIL, payload: err });
      });

  };
};
export const getPokemonsByType = (limit = 10, url) => {
  return dispatch => {
    dispatch({ type: POKEMONS.LOADING, loading: true });
    axios.get(url,
      {
        params: {
          limit: 10
        }
      }
    ).then((response) => {
      let { pokemon } = response.data;
      pokemon = pokemon.splice(0, 10);
      Promise.all(pokemon.map(pokemon => {
        return axios.get(pokemon.pokemon.url)
          .then(response => {
            let { id, name, types, sprites } = response.data;
            let pokemon = { id, avatar: sprites.front_default, name, types };
            return pokemon;
          });
      }))
        .then(response => {
          let responsePokemons = { 'count': 10, 'list': response }
          dispatch({ type: POKEMONS.GET_POKEMONS_SUCCESS, data: responsePokemons });
          dispatch({ type: POKEMONS.LOADING, loading: false });
        })

    })
      .catch((err) => {
        dispatch({ type: POKEMONS.GET_POKEMONS_FAIL, payload: err });
      });

  };
};
export function pokemonsTypes() {
  return function (dispatch) {
    return axios.get(`${baseURL}type`, { params: { limit: 10 } })
      .then(response => {
        dispatch(dispatch({
          type: POKEMONS.GET_POKEMONS_TYPE_SUCCESS, data: response.data.results
        }))
      })
  }
}