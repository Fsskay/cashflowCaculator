import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker"
import CreateBtn from "../components/CreateBtn";
import {parseToYearAndMonth, flatternArr, padLeft,LIST_VIEW, CHART_VIEW,} from '../unility'
import TotalPrice from "../components/TotalPrice"
import {testCategories, testItems} from "../testData"
import {AppContext} from "../App"
import withContext from "../WithContext";

const tabsText = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: parseToYearAndMonth(),
            tabView:tabsText[0]
        }
    }


    changeDate = (year, month) => {
        this.setState({
            currentDate: {year, month}
        })
    }

    changeViews = (index) => {
        this.setState({
            tabView:tabsText[index]
        })
    }




    createItem = () => {

    }
    deleteItem = () => {

    }
    modifyItem = () => {

    }


    render() {
        const {data} = this.props
        const {items,categories} = data
        console.log(data)
        const {currentDate,tabView} = this.state

        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid];
            return items[id]
        }).filter(item => {
            return item.monthCategory.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })


        let totalIncome = 0, totalOutcome = 0;
        itemsWithCategory.forEach(item => {
            if (item.category.type === 'outcome') {
                totalOutcome += item.price
            } else {
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
                        <Tabs activeIndex={0} onChangeTabs={this.changeViews}>
                            <Tab>
                                列表模式
                            </Tab>
                            <Tab>
                                图表模式
                            </Tab>
                        </Tabs>
                    </React.Fragment>
                    <CreateBtn CreateBtnOnClick={this.createItem}/>
                </div>
                {
                    tabView === LIST_VIEW &&
                    <PriceList items={itemsWithCategory} onDeleteItem={this.deleteItem} onModifyItem={this.modifyItem}/>
                }
                {   tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
                    <div className="alert alert-light text-center no-record">
                        您还没有任何记账记录
                    </div>
                }
                {
                    tabView === CHART_VIEW &&
                        <h2>这里是图表模式</h2>
                }


            </React.Fragment>
        )
    }
}

export default withContext(Home)