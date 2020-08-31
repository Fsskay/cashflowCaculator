import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker"
import CreateBtn from "../components/CreateBtn";
import {parseToYearAndMonth,flatternArr,padLeft} from '../unility'
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
        }).filter(item =>{
           return  item.monthCategory.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })

        console.log('Categories',Categories)
        console.log('Items',Items)
        console.log('itemsWithCategory',itemsWithCategory)

        let totalIncome = 0, totalOutcome=0;
        itemsWithCategory.forEach(item=>{
            if (item.category.type ==='outcome'){
                totalOutcome += item.price
            } else{
                totalIncome += item.price
            }
        })
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
                    <TotalPrice income={totalIncome} outcome={totalOutcome}/>
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