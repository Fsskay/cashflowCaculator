import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './containers/Home'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {testCategories, testItems} from "./testData"
import {flatternArr,parseToYearAndMonth,ID} from "./unility";
import Create from './containers/Create'
import SubmitSuccess from './containers/SubmitSuccess'
export const AppContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories:flatternArr(testCategories),
      items:flatternArr(testItems),
    }
    this.actions = {
        deleteItem:(item) =>{
            delete this.state.items[item.id]
            this.setState({
                items:this.state.items
            })
        },
        createItem:(data,selectedCategoryID)=>{
            const newId = ID()
            const parsedDate = parseToYearAndMonth(data.date)
            data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
            data.timestamp = new Date(data.date).getTime()
            const newItem = {...data,id:newId,cid:selectedCategoryID}
            this.setState({
                items:{...this.state.items,[newId]:newItem}
            })
        },
        updateItem:(item,updatedCategoryId)=>{
            //编辑好的item,加上cid与timestamp
            const modifiedItem = {
                ...item,
                cid:updatedCategoryId,
                timestamp:new Date(item.date).getTime()
            }
            this.setState({
                items:{...this.state.items,[modifiedItem.id]:modifiedItem}
            })
        }
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
                        <Route path="/Submit" component={SubmitSuccess}/>
                    </div>
                </div>
            </Router>
        </AppContext.Provider>
    );
  }


}

export default App;
