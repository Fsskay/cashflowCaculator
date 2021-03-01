import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import PriceList from "../components/PriceList";
import CreateBtn from "../components/CreateBtn";
import {parseToYearAndMonth, flatternArr, padLeft, LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME} from '../unility'
import TotalPrice from "../components/TotalPrice"
import TotalOutcome from '../components/TotalOutcome'
import TotalIncome from '../components/TotalIncome'
import withContext from "../WithContext";
import {withRouter} from 'react-router-dom'
import {Collapse, BackTop} from 'antd';
import PieChart from '../components/PieChart'
import logo from '../logo.svg';
const tabsText = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: parseToYearAndMonth(),
            tabView: tabsText[0],
            itemsWithCategory: []
        }
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

        const {Panel} = Collapse;
        const {data} = this.props
        const {items, categories} = data
        const {currentDate, tabView} = this.state
        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid];
            return items[id]
        }).filter(item => {
            return item.monthCategory.includes(`${currentDate.year}-${currentDate.month}`)
        })

        //固定支出数据
        const itemsOfFixedOutcome = itemsWithCategory.filter(item => {
            return item.category.outcomeType === 'fixed'
        })

        //弹性支出数据
        const itemsOfFlexibleOutcome = itemsWithCategory.filter(item => {
            return item.category.outcomeType === 'flexible'
        })


        //主动收入数据
        const itemsOfActiveIncome = itemsWithCategory.filter(item => {
            return item.category.incomeType === 'active'
        })

        //被动收入数据
        const itemsOfPassiveIncome = itemsWithCategory.filter(item => {
            return item.category.incomeType === 'passive'
        })


        let totalIncome = 0, totalOutcome = 0;
        itemsWithCategory.forEach(item => {
            if (item.category.type === 'outcome') {
                totalOutcome += item.price
            } else {
                totalIncome += item.price
            }
        })

        let flexibleOutcome = 0, fixedOutcome = 0;
        itemsWithCategory.forEach(item => {
            if (item.category.outcomeType === 'flexible') {
                flexibleOutcome += item.price
            }
        })

        itemsWithCategory.forEach(item => {
            if (item.category.outcomeType === 'fixed') {
                fixedOutcome += item.price
            }
        })

        let activeIncome = 0, passiveIncome = 0;
        itemsWithCategory.forEach(item => {
            if (item.category.incomeType === 'active') {
                activeIncome += item.price
            }
        })

        itemsWithCategory.forEach(item => {
            if (item.category.incomeType === 'passive') {
                passiveIncome += item.price
            }
        })

        //现金流
        let moneyFlow = (totalIncome - totalOutcome)



        return (
            <React.Fragment>
                <div className="App-header">
                    <div className="row justify-content-center">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                    <div className="row justify-content-center align-content-center">
                        <h3 style={{color: "white", textAlign: "center"}}>您的结余:<br/>
                            {moneyFlow}</h3>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TotalPrice income={totalIncome} outcome={totalOutcome}/>
                            <TotalIncome income={activeIncome} outcome={fixedOutcome}/>
                            <TotalOutcome income={passiveIncome} outcome={flexibleOutcome}/>
                        </div>
                    </div>
                </div>
                <div className="content-area py-1 px-1">

                    <CreateBtn CreateBtnOnClick={this.createItem}/>
                    <br/>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="主动收入" key="1">
                            <PriceList items={itemsOfActiveIncome} onDeleteItem={this.deleteItem}
                                       onModifyItem={this.modifyItem}/>
                        </Panel>
                        <Panel header="被动收入" key="2">
                            <PriceList items={itemsOfPassiveIncome} onDeleteItem={this.deleteItem}
                                       onModifyItem={this.modifyItem}/>
                        </Panel>
                        <Panel header="固定支出" key="3">
                            <PriceList items={itemsOfFixedOutcome} onDeleteItem={this.deleteItem}
                                       onModifyItem={this.modifyItem}/>
                        </Panel>
                        <Panel header="弹性支出" key="4">
                            <PriceList items={itemsOfFlexibleOutcome} onDeleteItem={this.deleteItem}
                                       onModifyItem={this.modifyItem}/>
                        </Panel>
                    </Collapse>
                </div>
                <div>
                    <BackTop>
                        <div className="site-back-top-basic">回到顶部</div>
                    </BackTop>
                </div>


            </React.Fragment>
        )
    }
}

export default withRouter(withContext(Home))