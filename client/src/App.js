import React, { Component } from 'react';
import './App.css';
import Recorder from './components/Recorder';
import AdminPanel from './components/AdminPanel';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Switch>
          <Route exact path="/" component={Recorder} />
          <Route exact path="/admin" component={AdminPanel} />
        </Switch>
      </div>
    );
  }
}

export default App;
