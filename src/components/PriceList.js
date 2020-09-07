import React, {Component} from "react";

class PriceList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {items,onDeleteItem,onModifyItem} = this.props

        return (
            <ul className="list-group list-group-flush">
                {
                    items.map((item) => (
                        <li className="list-group-item d-flex
                        justify-content-between align-item-center"
                            key={item.id}>
                            <span className="col-1">{item.category.name}</span>
                            <span className="col-5">{item.title}</span>
                            <span className="col-2">{(item.category.type==="income")?'+':'-'}{item.price}</span>
                            <span className="col-2">{item.date}</span>
                            <a className="col-1" onClick={(event)=>{onModifyItem(item)}}>编辑</a>
                            <a onClick={(event)=>{onDeleteItem(item)}} className="col-1">删除</a>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default PriceList