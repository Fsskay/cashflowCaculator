import React, {Component} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import Home from './containers/Home'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {testCategories, testItems} from "./testData"
import {flatternArr} from "./unility";
import Create from './containers/Create'
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

            <Router>
                <div className="App">
                    <div className="container  pb-5">
                        <Route path="/" exact component={Home}/>
                        <Route path="/Create" component={Create}/>
                        <Route path="/edit/:id" component={Create}/>
                    </div>
                </div>
            </Router>

        </AppContext.Provider>
    );
  }


}

export default App;
