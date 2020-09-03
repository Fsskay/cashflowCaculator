import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import {TYPE_OUTCOME, TYPE_INCOME} from '../unility'
import withContext from "../WithContext";
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

const editItem = [{
    "title": "再次更新标题",
    "price": 2000,
    "date": "2018-09-15",
    "monthCategory": "2018-9",
    "id": "_qmatbbwq0",
    "cid": "6",
    "timestamp": 1536969600000
}]

const KayTestCategories = [
    {
        "name": "旅行",
        "iconName": "ios-plane",
        "id": "1",
        "type": "outcome"
    },
    {
        "name": "餐饮",
        "iconName": "ios-restaurant",
        "id": "2",
        "type": "outcome"
    },]

class Create extends Component {
    constructor(props) {
        super(props);
        const {id} = props.match.params
        const {categories, items} = props.data
        this.state = {
            tabsText: tabsText[0],
            selectedCategory: KayTestCategories[0]
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

    submitFormForCreate = (data, editMode) => {
        if (!editMode) {
            // createItem()
        } else {
            // updateItem()
        }
    }

    cancelForm = () => {
        this.props.history.push('/')
    }

    render() {
        const {data} = this.props
        const {items, categories, } = data
        const {selectedCategory} = this.state


        console.log('KayTestCategories', KayTestCategories)
        console.log('selectedCategory',selectedCategory);


        return (
            <div>
                <Tabs onChangeTabs={this.createTabChange}>
                    <Tab>
                        支出
                    </Tab>
                    <Tab>
                        收入
                    </Tab>
                </Tabs>
                <CategorySelect CategoriesOfSelect={KayTestCategories} onSelectCategory={this.selectCategory}
                                selectedCategory={selectedCategory}/>

                <PriceForm item={editItem} onSubmitForm={this.submitFormForCreate} onCancelForm={this.cancelForm}/>
            </div>
        );
    }
}

export default withContext(Create)