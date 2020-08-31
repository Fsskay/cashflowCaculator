import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './containers/Home'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {testCategories, testItems} from "./testData"
import {flatternArr} from "./unility";

export const AppContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories:flatternArr(testCategories),
      items:flatternArr(testItems),
    }
  }




  render() {
    return (
        <AppContext.Provider value={{
          state: this.state,
          actions: this.actions
        }}>

            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <Home/>
              </header>
            </div>

        </AppContext.Provider>
    );
  }


}

export default App;
