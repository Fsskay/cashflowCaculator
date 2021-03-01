import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import {TYPE_OUTCOME, TYPE_INCOME} from '../unility'
import withContext from "../WithContext";
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import {withRouter} from 'react-router-dom'
import Ionicon from "react-ionicons";



const tabsText = [TYPE_INCOME,TYPE_OUTCOME]


class Create extends Component {
    constructor(props) {
        super(props);
        const {id} = props.match.params
        const {categories,items} = props.data
        this.state = {
            //先拿到id上的cid,然后再从categories上取
            //(id && items[id])?是用于edit页面选定categories
            selectedTab:(id && items[id])? categories[items[id].cid].type:TYPE_INCOME,
            tabsText: tabsText[0],
            selectedCategory:(id && items[id])? categories[items[id].cid]:null,
            validationPassed: true,
        }
    }
    
    selectCategory = (category) => {
        this.setState({
            selectedCategory: category
        })
    }

    createTabChange = (index) => {
        this.setState({
            selectedTab: tabsText[index],
            selectedCategory: null
        })
    }
    //传入data和editMode,传给createItem 数据和选择好的类目的id
    submitFormForCreate = (data, editMode) => {
        if (!this.state.selectedCategory) {
            this.setState({
                validationPassed: false,
            });
            return
        }
        if (!editMode) {
            //  createItem()
            this.props.actions.createItem(data,this.state.selectedCategory.id)
        } else {
            // updateItem()
            this.props.actions.updateItem(data,this.state.selectedCategory.id)

        }
        this.props.history.push('/submit')
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
        const {selectedTab,selectedCategory,validationPassed} = this.state
        //删选类别不同的category,先变成数组,筛选出selectedTab相同的category
        const filterCategories = Object.keys(categories)
            .filter(id => categories[id].type === selectedTab)
            .map(id => categories[id]);


        const tabIndex = tabsText.findIndex(text=>text===selectedTab)
        //这一条的作用是用于显示create/edit页面的Tab高亮
        return (
            <React.Fragment>
            <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fff', padding: 20}}>
                <Tabs activeIndex={tabIndex} onChangeTabs={this.createTabChange}>
                    <Tab>
                        <strong>收入</strong>
                    </Tab>
                    <Tab>
                        <strong>支出</strong>
                    </Tab>
                </Tabs>
                <CategorySelect CategoriesOfSelect={filterCategories} onSelectCategory={this.selectCategory}
                                selectedCategory={selectedCategory}/>

                <PriceForm item={editItem} onSubmitForm={this.submitFormForCreate} onCancelForm={this.cancelForm}/>
                { !validationPassed &&
                <div className="alert alert-danger mt-5" role="alert">
                    请选择分类信息
                </div>
                }
            </div>

            </React.Fragment>
        );
    }
}

export default withRouter(withContext(Create))