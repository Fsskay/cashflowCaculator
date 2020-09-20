import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker"
import CreateBtn from "../components/CreateBtn";
import {parseToYearAndMonth, flatternArr, padLeft, LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME} from '../unility'
import TotalPrice from "../components/TotalPrice"
import {testCategories, testItems} from "../testData"
import PieChart from "../components/PieChart"
import withContext from "../WithContext";
import {withRouter} from 'react-router-dom'


const tabsText = [LIST_VIEW, CHART_VIEW]

const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
    let categoryMap = {}
    items.filter(item => item.category.type === type).forEach(item => {
        if (categoryMap[item.cid]) {
            categoryMap[item.cid].value += (item.price * 1)
            categoryMap[item.cid].items.push(item.id)
        } else {
            categoryMap[item.cid] = {
                name: item.category.name,
                value: item.price * 1,
                items: [item.id]
            }
        }
    })
    return Object.keys(categoryMap).map(mapKey => ({...categoryMap[mapKey]}))
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: parseToYearAndMonth(),
            tabView: tabsText[0],
            itemsWithCategory: []
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

        const chartOutcomDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME)
        const chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME)

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
                <div  className="App-header">
                    <div className="row">
                        <div className="col">
                            <MonthPicker
                                year={currentDate.year}
                                month={currentDate.month}
                                onChange={this.changeDate}
                            />
                        </div>
                        <div className="col">
                            <TotalPrice income={totalIncome} outcome={totalOutcome}/>
                        </div>
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
                    <React.Fragment>
                        <PieChart title="本月支出" categoryData={chartOutcomDataByCategory}/>
                        <PieChart title="本月收入" categoryData={chartIncomeDataByCategory}/>
                    </React.Fragment>
                }
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(withContext(Home))