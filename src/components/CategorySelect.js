import React, {Component} from "react";
import {Colors} from '../unility'
import {Button, Space, Radio} from 'antd'


class CategorySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategoryId: props.selectedCategory && props.selectedCategory.id,
        }
    }

    selectCategory2 = (event, category, index) => {
        this.setState({
            selectedCategoryId: category.id,
        })
        this.props.onSelectCategory(category)
        event.preventDefault()
    }


    render() {
        const {CategoriesOfSelect, selectedCategory} = this.props
        const selectedCategoryId = selectedCategory && selectedCategory.id

        return (
            <div>
                <div>
                    <ul class="nav nav-tabs nav-fill my-4 ">
                        {
                            CategoriesOfSelect.map((category, index) => {
                                // const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray;
                                // const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray;
                                const activeClassName = (selectedCategoryId === category.id) ? ' nav-link active' : 'nav-link';
                                return (

                                    <li className="nav-item ">
                                        <a href="#"
                                            key={index}
                                            className={activeClassName}
                                            onClick={(event) => {
                                            this.selectCategory2(event, category, index)
                                        }}>
                                            <strong>{category.name}</strong>
                                        </a>
                                    </li>


                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        );
    }

}

export default CategorySelect