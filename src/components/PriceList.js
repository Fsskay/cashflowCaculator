import React, {Component} from "react";

class PriceList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {items} = this.props
        return (
            <ul>
                {
                    items.map((item) => (
                        <li>
                            <li>{item.category.name}</li>
                            <li>{item.title}</li>
                            <li>{item.price}</li>
                            <li>{item.date}</li>
                            <a href="#">编辑按钮</a>
                            <a href="#">删除按钮</a>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default PriceList