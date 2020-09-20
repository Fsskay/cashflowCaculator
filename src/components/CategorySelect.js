import React, {Component} from "react";
import {Colors} from '../unility'
import Ionicon from 'react-ionicons'



class CategorySelect extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedCategoryId: props.selectedCategory && props.selectedCategory.id

        }
    }

    selectCategory2 = (event, category) => {
        this.setState({
            selectedCategoryId:category.id
        })
        this.props.onSelectCategory(category)
        event.preventDefault()
    }


    render() {
        const {CategoriesOfSelect,selectedCategory} = this.props
        const selectedCategoryId = selectedCategory && selectedCategory.id

        return (
        <div className="category-select-component">
            <div className="row">
                {
                    CategoriesOfSelect.map((category, index) => {
                        const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray;
                        const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray;
                        const activeClassName = (selectedCategoryId ===category.id)?'category-item col-2 selectedCategory-active':'category-item col-2';
                        return (
                            <div className={activeClassName} role="button" style={{ textAlign: 'center'}}
                                 onClick={(event) => {
                                     this.selectCategory2(event, category)
                                 }}>
                                <Ionicon
                                    className="rounded-circle createIcon"
                                    style={{ backgroundColor: backColor, padding: '5px' }}
                                    fontSize="50px"
                                    color={iconColor}
                                    icon={category.iconName}
                                />
                                <p color={iconColor}>{category.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        );
    }

}

export default CategorySelect