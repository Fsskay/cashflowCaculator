import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker"
import CreateBtn from "../components/CreateBtn";
import {parseToYearAndMonth, flatternArr, padLeft, LIST_VIEW, CHART_VIEW,} from '../unility'
import TotalPrice from "../components/TotalPrice"
import {testCategories, testItems} from "../testData"

import withContext from "../WithContext";
import {withRouter} from 'react-router-dom'


const tabsText = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: parseToYearAndMonth(),
            tabView: tabsText[0],
            itemsWithCategory:[]
        }
    }


    changeDate = (year, month) => {
        this.setState({
            currentDate: {year, month}
        })
    }

    homeChangeViews = (index) => {
        this.setState({
            tabView: tabsText[index]
        })
    }


    deleteItem = (item) => {
        this.props.actions.deleteItem(item)
    }
    createItem = () => {
        this.props.history.push('/create')
    }
    modifyItem = (item) => {
        this.props.history.push(`/edit/${item.id}`)
    }


    render() {
        const {data} = this.props
        const {items, categories} = data
        const {currentDate, tabView} = this.state
        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid];
            return items[id]
        }).filter(item => {
            return item.monthCategory.includes(`${currentDate.year}-${currentDate.month}`)
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

                <div className="row">
                    <div className="col">
                        <MonthPicker
                            year={currentDate.year}
                            month={currentDate.month}
                            onChange={this.changeDate}
                        />
                    </div>
                    <div  className="col">
                        <TotalPrice income={totalIncome} outcome={totalOutcome}/>
                    </div>
                </div>
                <div className="content-area py-3 px-3">
                    <React.Fragment>
                        <Tabs activeIndex={0} onChangeTabs={this.homeChangeViews}>
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
                {tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
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

export default withRouter(withContext(Home))