import React, {Component} from "react";
import {limitFloat} from '../unility'
import Ionicon from 'react-ionicons'

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

        const price = limitFloat(this.priceInput.value.trim() * 1) * 1
        const title = this.titleInput.value.trim()


        if (price && title) {
            console.log(1)
            if (price < 0) {
                this.setState({
                    submitPass: false,
                    errorMessage: '价格数字必须大于0'
                })


            } else if (price > 99999999) {
                this.setState({
                    submitPass: false,
                    errorMessage: '超出金额限制,请填写合理的金额'
                })
            } else {
                this.setState({
                    submitPass: true,
                    errorMessage: ''
                })
                if (editMode) {
                    onSubmitForm({...item, title, price}, editMode)

                } else {
                    onSubmitForm({title, price}, editMode)
                }

            }
        } else {
            this.setState({
                submitPass: false,
                errorMessage: '请输入所有必选项'
            })
        }
        event.preventDefault()
    }


    render() {
        const {title, price} = this.props.item
        return (
            <React.Fragment>
                <form onSubmit={(event) => {
                    this.submitForm(event)
                }} style={{background: '#fff'}}>
                    <div className="form-group">
                        <label htmlFor="title"><strong>项目*</strong></label>
                        <input type="text"
                               ref={(input) => {
                                   this.titleInput = input
                               }}
                               id="title"
                               className="form-control"
                               defaultValue={title}
                               placeholder="请输入您的收支项目"

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price"><strong>金额*</strong></label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">￥</span>
                            </div>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="请输入金额(人民币)"
                                defaultValue={price}
                                ref={(input) => {
                                    this.priceInput = input
                                }}
                            />
                        </div>

                    </div>


                    <button type="submit" className="btn btn-primary  btn-block"><strong>提交</strong>
                        <Ionicon
                            fontSize="40px"
                            icon={"ios-checkmark"}
                    /></button>
                    <button onClick={this.props.onCancelForm} className="btn btn-default btn-block"><strong>取消</strong>
                        <Ionicon
                            fontSize="40px"
                            icon={"ios-close"}
                        />
                    </button>
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