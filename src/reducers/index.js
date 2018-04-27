import { combineReducers } from 'redux'

import * as POKEMONS from './pokemon-reducer';

export default combineReducers({
  ...POKEMONS
})