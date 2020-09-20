import React, {Component} from "react";
import {isValidDate} from '../unility'


class PriceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitPass: true,
            errorMessage: '',
        }
    }

    submitForm = (event) => {
        const {item, onSubmitForm} = this.props;
        const editMode = !!item.id
        console.log(item.id)
        console.log('是编辑模式?=>',editMode)
        const price = this.priceInput.value.trim() * 1
        const title = this.titleInput.value.trim()
        const date = this.dateInput.value.trim()

        if (price && title && date ) {
            console.log(1)
            if (price < 0) {
                this.setState({
                    submitPass: false,
                    errorMessage: '价格数字必须大于0'
                })
                console.log(2)

            } else if (!isValidDate(date)) {
                this.setState({
                    submitPass: false,
                    errorMessage: '请填写正确的日期格式'
                })
                console.log(3)

            } else {
                this.setState({
                    submitPass: true,
                    errorMessage: ''
                })
                console.log(4)

                if (editMode) {
                    onSubmitForm({...item, title, price, date}, editMode)

                } else {
                    onSubmitForm({title, price, date}, editMode)
                }
                console.log(5)

            }
        } else {
            console.log(6)

            this.setState({
                submitPass: false,
                errorMessage: '请输入所有必选项'
            })
        }
        event.preventDefault()
    }

    render() {
        const {title, price, date} = this.props.item
        return (
            <React.Fragment>
            <form onSubmit={(event) => {
                this.submitForm(event)
            }} style={{background: '#fff'}}>
                <div className="form-group">
                    <label htmlFor="title">标题*</label>
                    <input type="text"
                           ref={(input) => {
                               this.titleInput = input
                           }}
                           id="title"
                           className="form-control"
                           defaultValue={title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">价格*</label>
                    <input type="number"
                           ref={(input) => {
                               this.priceInput = input
                           }}
                           id="price"
                           className="form-control"
                           defaultValue={price}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">日期*</label>
                    <input type="date"
                           ref={(input) => {
                               this.dateInput = input
                           }}
                           id="date"
                           className="form-control"
                           defaultValue={date}
                    />
                </div>

                <button type="submit" className="btn btn-primary mr-3 ">提交</button>
                <button onClick={this.props.onCancelForm} className="btn mr-3 ">取消</button>
                {!this.state.submitPass &&
                    <div className="alert alert-danger mt-5" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
            </form>
            </React.Fragment>
        );
    }
}

export default PriceForm