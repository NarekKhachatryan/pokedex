import React, { Component } from 'react';

class List extends Component {
  render() {
    const { pokemons, loading } = this.props
    return (
      <div className="list">
        <div className="listBox">
          {loading === false ? pokemons && pokemons.map((item, i) => {
            return <div key={i} className="listItem">
              <div className="number">N {item.id}</div>
              <img src={item.avatar} alt={''} />
              <div className="name">{item.name}</div>
            </div>
          }) : <div className='loading'> Loading...<img src='http://a.top4top.net/p_1990j031.gif' alt={''} /></div>}
        </div>
      </div>
    );
  }
}

export default List;