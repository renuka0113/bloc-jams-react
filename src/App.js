import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
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
        //  <Route path="/album/" component={Album} />
        //we modified the above path; the reason is that we want each album to have its own unique path
        //for this reason we add a URL parameter
          <Route path="/album/:slug" component={Album}/>
          </main>
      </div>
    );
  }
}

export default App;
