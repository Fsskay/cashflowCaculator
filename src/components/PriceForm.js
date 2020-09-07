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
        const title = this.titleInput.value.trim()
        const price = this.priceInput.value.trim() * 1
        const date = this.dateInput.value.trim()

        if (price && title && date ) {
            if (price < 0) {
                this.setState({
                    submitPass: false,
                    errorMessage: '价格数字必须大于0'
                })
            } else if (!isValidDate(date)) {
                this.setState({
                    submitPass: false,
                    errorMessage: '请填写正确的日期格式'
                })
            } else {
                this.setState({
                    submitPass: true,
                    errorMessage: ''
                })
                if (editMode) {
                    onSubmitForm({...item, title, price, date}, editMode)

                } else {
                    onSubmitForm({title, price, date}, editMode)
                }
            }
        } else {
            this.setState({
                validatePass: false,
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
                <div>
                    <label>标题*</label>
                    <input type="text"
                           ref={(input) => {
                               this.titleInput = input
                           }}
                           id="title"
                           defaultValue={title}
                    />
                </div>
                <div>
                    <label>价格*</label>
                    <input type="number"
                           ref={(input) => {
                               this.priceInput = input
                           }}
                           id="price"
                           defaultValue={price}
                    />
                </div>
                <div>
                    <label>日期*</label>
                    <input type="date"
                           ref={(input) => {
                               this.dateInput = input
                           }}
                           id="date"
                           defaultValue={date}
                    />
                </div>
                <button type="submit">提交</button>
                <button onClick={this.props.onCancelForm}>取消</button>
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