import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import {TYPE_OUTCOME, TYPE_INCOME} from '../unility'
import withContext from "../WithContext";
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import {withRouter} from 'react-router-dom'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

//





class Create extends Component {
    constructor(props) {
        super(props);
        const {id} = props.match.params
        const {categories,items} = props.data
        this.state = {
            //先拿到id上的cid,然后再从categories上取
            //(id && items[id])?是用于edit页面选定categories
            selectedTab:(id && items[id])? categories[items[id].cid].type:TYPE_OUTCOME,
            tabsText: tabsText[0],
            selectedCategory:(id && items[id])? categories[items[id].cid]:null,
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
            //  createItem()
            console.log("this.props.actions.createItem 上")
            this.props.actions.createItem(data,this.state.selectedCategory.id)
            console.log("this.props.actions.createItem 下")
        } else {
            // updateItem()
            console.log("this.props.actions.updateItem上")
            this.props.actions.updateItem(data,this.state.selectedCategory.id)
            console.log("this.props.actions.updateItem下")

        }
        this.props.history.push('/')
    }

    cancelForm = () => {
        this.props.history.push('/')
    }

    render() {
        const {data} = this.props
        const {items, categories, } = data
        const {id} = this.props.match.params
        //拿到当前路由有关的ID,用于显示编辑页面input内的内容

        const editItem=(id&&items[id])?items[id]:{}
        console.log('editItem',editItem)
        const {selectedTab,selectedCategory} = this.state
        //删选类别不同的category,先变成数组,筛选出selectedTab相同的category
        const filterCategories = Object.keys(categories)
            .filter(id => categories[id].type === selectedTab)
            .map(id => categories[id]);


        const tabIndex = tabsText.findIndex(text=>text===selectedTab)
        //这一条的作用是用于显示create/edit页面的Tab高亮
        return (
            <React.Fragment>
            <div>
                <Tabs activeIndex={tabIndex} onChangeTabs={this.createTabChange}>
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