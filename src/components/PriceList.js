import React, {Component} from "react";
import Ionicon from 'react-ionicons'


class PriceList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {items, onDeleteItem, onModifyItem} = this.props

        return (
            <div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex
                        justify-content-between align-item-center">
                        <strong className="col-1">类型</strong>
                        <strong className="col-5">名称</strong>
                        <strong className="col-2">金额</strong>
                        <strong className="col-2">日期</strong>
                        <strong className="col-1">编辑</strong>
                        <strong className="col-1">删除</strong>

                    </li>
                </ul>

                <ul className="list-group list-group-flush">
                    {
                        items.map((item) => (
                            <li className="list-group-item d-flex
                        justify-content-between align-item-center"
                                key={item.id}>
                                <span className="col-1">{item.category.name}</span>
                                <span className="col-5">{item.title}</span>
                                <span
                                    className="col-2">{(item.category.type === "income") ? '+' : '-'}{item.price}</span>
                                <span className="col-2">{item.date}</span>
                                <a className="col-1" onClick={(event) => {
                                    onModifyItem(item)
                                }}> <Ionicon
                                    className="rounded-circle"
                                    fonSize="30px"
                                    style={{backgroundColor: '#28a745', padding: '6px'}}
                                    color={'#fff'}
                                    icon='ios-create-outline'
                                /></a>
                                <a onClick={(event) => {
                                    onDeleteItem(item)
                                }} className="col-1">
                                    <Ionicon
                                    className="rounded-circle"
                                    fonSize="30px"
                                    style={{backgroundColor: '#dc3545', padding: '0px'}}
                                    color={'#fff'}
                                    icon='ios-close'
                                /></a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default PriceList