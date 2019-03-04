import React, { Component } from 'react';
import logo from './logo.svg';
 import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          </header>
          <header>
          <nav>
            <Link to='/'>Landing</Link>
            <Link to='/library'>Library</Link>
          </nav>
            <h1>Bloc Jams</h1>
          </header>
          <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          </main>
      </div>
    );
  }
}

export default App;
