import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import {TYPE_OUTCOME, TYPE_INCOME} from '../unility'
import withContext from "../WithContext";
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import {withRouter} from 'react-router-dom'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

//


const editItem = [{
    "title": "再次更新标题",
    "price": 2000,
    "date": "2018-09-15",
    "monthCategory": "2018-9",
    "id": "_qmatbbwq0",
    "cid": "6",
    "timestamp": 1536969600000
}]



class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:TYPE_OUTCOME,
            tabsText: tabsText[0],
            selectedCategory: null,
            filterCategories:[]
        }
    }


    selectCategory = (category) => {
        this.setState({
            selectedCategory: category
        })
    }

    createTabChange = (index) => {
        this.setState({
            selectedTab: tabsText[index]
        })
    }
    //传入data和editMode,传给createItem 数据和选择好的类目的id
    submitFormForCreate = (data, editMode) => {
        if (!editMode) {
            this.props.actions.createItem(data,this.state.selectedCategory.id)
        } else {
            // updateItem()
        }
        this.props.history.push('/')
    }

    cancelForm = () => {
        this.props.history.push('/')
    }

    render() {
        const {data} = this.props
        const {items, categories, } = data
        const {selectedTab,selectedCategory} = this.state
        //删选类别不同的category,先变成数组,筛选出selectedTab相同的category
        const filterCategories = Object.keys(categories)
            .filter(id => categories[id].type === selectedTab)
            .map(id => categories[id]);

        console.log('filterCategories', filterCategories)
        console.log('selectedCategory',selectedCategory);


        return (
            <React.Fragment>
            <div>
                <Tabs onChangeTabs={this.createTabChange}>
                    <Tab>
                        支出
                    </Tab>
                    <Tab>
                        收入
                    </Tab>
                </Tabs>
                <CategorySelect CategoriesOfSelect={filterCategories} onSelectCategory={this.selectCategory}
                                selectedCategory={selectedCategory}/>

                <PriceForm item={editItem} onSubmitForm={this.submitFormForCreate} onCancelForm={this.cancelForm}/>
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withContext(Create))