import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import {TYPE_OUTCOME, TYPE_INCOME} from '../unility'
import withContext from "../WithContext";
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

class Create extends Component{
    constructor(props) {
        super(props);
        this.state={
            tabsText:tabsText[0],
        }
    }

    createTabChange = (index) => {
        this.setState({
            selectedTab: tabsText[index]
        })
    }

    submitFormForCreate = (data,editMode) =>{
        if (!editMode){
            // createItem()
        }else {
            // updateItem()
        }
    }

    render() {
        const {data} = this.props
        const {items,categories} = data
        const {id} = this.props.match.params
        const editItem = (id && items[id]) ? items[id] : {}
        const {selectedTab} = this.state;
        const filterCategories = Object.keys(categories)
            .map(id => categories[id]);
        console.log("filterCategories",filterCategories)


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

                <CategorySelect CategoriesOfSelect={filterCategories} onSelectCategory={this.selectCategory}/>

                <PriceForm  item={editItem} onSubmitForm={this.submitFormForCreate} onCancelForm={this.cancelForm}/>
            </div>
        );
    }
}

export default withContext(Create)