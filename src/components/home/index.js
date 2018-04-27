import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import List from './list';
import Pagination from '../root/pagination';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      offset: 0,
      selectValue: '',
      paginationCount: 0
    }
  }

  componentWillMount() {
    const { paginationCount } = this.state;
    this.props.getPokemons(10, paginationCount);
    this.props.pokemonsTypes();
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ search: value });
  }
  handleClick(e) {
    e.preventDefault();
  }
  editPagination = (number) => {
    window.scrollTo(0, 0);
    this.props.getPokemons(10, number * 10);
    this.setState({
      paginationCount: number * 10
    });
  };
  handleTypeChange(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({
      selectValue: value
    })
    this.props.getPokemonsByType(10, value)
  }
  render() {
    let { list, types, loading } = this.props;
    const {paginationCount, selectValue, search } = this.state;
    let pokemons = [];
    if (list) {
      if (search && search.length > 0) {
        pokemons = list.list.filter(pokemon =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        )
      } else {
        pokemons = list.list
      }
    }

    return (
      <div className="home">
        <form className="searchBox" onSubmit={(e) => this.handleClick(e)}>
          <input className='searchTerm' type="text" onChange={(e) => this.handleChange(e)} />
          <input className='searchButton' type="submit" />
        </form>
        <div className="container">
          <div className="pokemonsFilter">
            <select onChange={(e) => this.handleTypeChange(e)} value={selectValue}>
              <option value="">Select Type</option>
              {types && types.map((item, i) => {
                return <option key={i} value={item.url} >{item.name}</option>
              })}
            </select>
          </div>
          <List loading={loading && loading} pokemons={pokemons && pokemons} />
        </div>
        {list && list.count > 10 &&
          <Pagination
            count={list.count}
            page={paginationCount / 10}
            show={5}
            buttons={10}
            yourFunction={this.editPagination}
          />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { getPokemons, getPokemonType, loading } = state;
  return {
    list: getPokemons.list,
    types: getPokemonType.list,
    loading: loading.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPokemons: (limit, offset) => {
      dispatch(actions.getPokemons(limit, offset));
    },
    getPokemonsByType: (limit, url) => {
      dispatch(actions.getPokemonsByType(limit, url));
    },
    pokemonsTypes: () => {
      dispatch(actions.pokemonsTypes());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);