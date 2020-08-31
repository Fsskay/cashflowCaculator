import React, {Component} from "react";

class PriceList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {items,onDeleteItem} = this.props

        return (
            <ul>
                {
                    items.map((item) => (
                        <li>
                            <li>{item.category.name}</li>
                            <li>{item.title}</li>
                            <li>{(item.category.type==="income")?'+':'-'}{item.price}</li>
                            <li>{item.date}</li>
                            <a href="#">编辑按钮</a>
                            <a href="#" onClick={(event)=>{onDeleteItem(item)}}>删除按钮</a>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default PriceList