import React, {Component} from "react";
import { isValidDate } from '../unility'


class PriceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitPass: true,
            errorMessage: ''
        }
    }

    submitForm = (event) => {
        const { item,onSubmitForm } = this.props;
        const {editMode} = !!item.id
        const title = this.titleInput.value.trim *1
        const price = this.priceInput.value.trim
        const date = this.dateInput.value.trim

        if (price && title && date) {
            if (price < 0) {
                this.setState({
                    submitPass: false,
                    errorMessage: '金额不能小于0'
                })
            }else if (!isValidDate(date)) {
                this.setState({
                    validatePass: false,
                    errorMessage: '请填写正确的日期格式'
                })
            } else {
                this.setState({
                    validatePass: true,
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
                submitPass: false,
                errorMessage: '请输入所有项'
            })
        }
        event.preventDefault()
    }

    render() {
        const {title, price, date} = this.props.item
        return (
            <form onSubmit={(event) => {
                this.submitForm(event)
            }}>
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
                {!this.state.validatePass &&
                <div className="alert alert-danger mt-5" role="alert">
                    {this.state.errorMessage}
                </div>
                }
            </form>
        );
    }
}

export default PriceForm