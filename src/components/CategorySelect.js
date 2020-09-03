import React, {Component} from "react";
import {Colors} from '../unility'



class CategorySelect extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedCategoryId: props.selectedCategory && props.selectedCategory.id

        }
    }

    selectCategory2 = (event, category) => {
        this.props.onSelectCategory(category)
        event.preventDefault()
    }


    render() {
        const {CategoriesOfSelect,selectedCategory} = this.props
        const selectedCategoryId = selectedCategory && selectedCategory.id
        console.log('CategoriesOfSelect', CategoriesOfSelect);
        return (

            <div className="row">
                {
                    CategoriesOfSelect.map((category, index) => {
                        const activeClassName = (selectedCategoryId ===category.id)?'category-item col-3 selectedCategory-active':'category-item col-3';
                        return (
                            <div className={activeClassName}
                                 onClick={(event) => {
                                     this.selectCategory2(event, category)
                                 }}>
                                <p>{category.name}</p>
                            </div>
                        )
                    })
                }


            </div>
        );
    }

}

export default CategorySelect