import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker"
import CreateBtn from "../components/CreateBtn";
import {parseToYearAndMonth,flatternArr} from '../unility'
import TotalPrice from "../components/TotalPrice"
import {testCategories, testItems} from "../testData"



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: parseToYearAndMonth(),
            Categories:flatternArr(testCategories),
            Items:flatternArr(testItems),
        }
    }



    changeDate = (year, month) => {
        this.setState({
            currentDate:{year,month}
        })
    }

    changeTabs = () => {

    }

    createItem=()=>{

    }


    render() {
        const {currentDate,Categories,Items} = this.state

        const itemsWithCategory = Object.keys(Items).map(id => {
            Items[id].category = Categories[Items[id].cid];
            return Items[id]
        })

        console.log('Categories',Categories)
        console.log('Items',Items)
        console.log('itemsWithCategory',itemsWithCategory)

        return (
            <React.Fragment>
                <div>
                    <MonthPicker
                        year={currentDate.year}
                        month={currentDate.month}
                        onChange={this.changeDate}
                    />
                </div>
                <div>
                    <TotalPrice income={1234} outcome={1234}/>
                </div>
                <div>
                    <React.Fragment>
                        <Tabs activeIndex={0} onChangeTabs={this.changeTabs}>
                            <Tab>
                                列表模式
                            </Tab>
                            <Tab>
                                图表模式
                            </Tab>
                        </Tabs>
                    </React.Fragment>
                    <CreateBtn CreateBtnOnClick = {this.createItem}/>
                </div>
                <div>
                    <PriceList items={itemsWithCategory}/>
                </div>
            </React.Fragment>
        )
    }
}

export default Home