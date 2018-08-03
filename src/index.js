import React, { Component } from 'react'
import { render } from 'react-dom'
import gamesList from './gamesList'
import './style.scss'

class App extends Component {
  constructor(props) {
    super(props);
    let shown = 9;

    this.state = {
      shown,
      gamesList,
      activeName: 1,
      activePop: 0,
    };
    this.addShown = this.addShown.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
    this.filter = this.filter.bind(this);
  }

  sortByName() {
    let sorted = [].slice.call(this.state.gamesList).sort((a, b) => {
      if (a.label === b.label) { return 0; }
      return a.label > b.label ? 1 : -1;
    });
    this.setState({
      gamesList: sorted,
      activeName: 0,
      activePop: 1,
    });
  }

  filter(e) {
    const value = e.target.value.toLowerCase();

    const filtered = [].slice.call(gamesList).filter((game) => {
      return game.label.toLowerCase().includes(value);
    });

    this.setState({
      gamesList: filtered
    });
  }

  sortByPopularity() {
    this.setState({
      gamesList,
      activeName: 1,
      activePop: 0,
    });
  }

  render() {
    return <div>
      <div className="container">
        <header>
          <div className="white_border">
            <input placeholder="Search"  className="search_block" onChange={this.filter}/>
          </div>
          <div className="white_border">
            <div className="sort_block">
              <div className="sort_text">Sort by</div>
              <div onClick={this.sortByName} className={this.state.activeName !== 0 ? 'sort_by_name' : 'sort_by_name active'}></div>
              <div onClick={this.sortByPopularity}  className={this.state.activePop !== 0 ? 'sort_by_pop' : 'sort_by_pop active'}></div>
            </div>
          </div>
        </header>
        <div className="grid">
          { this.renderItems() }
        </div>

        { this.showMoreButton() }
      </div>
    </div>
  }

  showMoreButton() {
    let className = 'btn_block';
    if (this.state.shown >= this.state.gamesList.length) {
      className += ' display-none';
    }
    return <div className={className}>
      <button className="btn" onClick={this.addShown}>More games</button>
    </div>
  }

  addShown() {
    this.setState({
      shown: this.state.shown + 9
    });
  }

  renderItems() {
    return this.state.gamesList.map(this.renderItem.bind(this))
  }

  renderItem(game, i) {
    let className = 'item';
    if (i >= this.state.shown) {
      className += ' display-none';
    }

    return <div key={i} className={className}>
      <div className="fallback"/>
      <img src={game.logoUrl}/>
      <div className="label">{ game.label }</div>
    </div>
  }
}

render(<App />, document.getElementById('root'));
