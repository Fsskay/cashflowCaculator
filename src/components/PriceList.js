import React, {Component} from "react";
import Ionicon from 'react-ionicons'

class PriceList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {items, onDeleteItem, onModifyItem} = this.props
        return (
            <div >
                <div className="container">
                    <li className="list-group-item d-flex
                        justify-content-between align-item-center row">
                        <strong className="col-3" style={{color:'rgb(0, 123, 255)'}}>项目</strong>
                        <strong className="col-3" style={{color:'rgb(0, 123, 255)'}}>金额</strong>
                        <strong className="col-3" style={{color:'rgb(0, 123, 255)'}}>编辑</strong>
                        <strong className="col-3" style={{color:'rgb(0, 123, 255)'}}>删除</strong>
                    </li>
                </div>

                <div className="container">
                    {
                        items.map((item) => (
                            <li className="list-group-item d-flex
                        justify-content-between align-item-center row"
                                key={item.id}>
                                <strong className="col-3">{item.title}</strong>
                                <strong
                                    className="col-3">{(item.category.type === "income") ? '+' : '-'}{item.price}</strong>

                                <a
                                    className="col-3"
                                    onClick={(event) => {
                                        onModifyItem(item)
                                    }}>
                                    <Ionicon
                                        className="rounded-circle priceListIcon"
                                        fonSize="10px"
                                        style={{ backgroundColor:'#28a745',padding:'1px'}}
                                        color={'#fff'}
                                        icon='ios-create-outline'
                                    />
                                    {/*<span style={{border:"solid 1px",borderColor:"rgba(0, 0, 0, 0.125)",padding:"2px",borderRadius:"5px",fontWeight:"bold"}}>编辑</span>*/}
                                </a>
                                <a
                                    className="col-3"
                                    onClick={(event) => {
                                        onDeleteItem(item)
                                    }}>
                                    <Ionicon
                                        className="rounded-circle priceListIcon"
                                        fonSize="15px"
                                        style={{ backgroundColor:'#dc3545',padding:'1px'}}
                                        color={'#fff'}
                                        icon='ios-close'
                                    />
                                    {/*<span style={{border:"solid 1px",borderColor:"rgba(0, 0, 0, 0.125)",padding:"2px",borderRadius:"5px",fontWeight:"bold"}}>删除</span>*/}
                                </a>
                            </li>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default PriceList