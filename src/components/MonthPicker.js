import React, {Component} from "react";
import {padLeft, range} from '../unility'

class MonthPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            month: this.props.month,
            toggleDropdownON: false
        }
    }
    componentDidMount() {
        document.addEventListener('click',this.handleClick,false)
    }
    componentWillUnmount() {
        document.removeEventListener('click',this.handleClick,false)
    }

    handleClick = (e)=>{
        if (this.node.contains(e.target)){
            return;
        }
        this.setState({
            toggleDropdownON:false
        })

    }

    toggleDropdown = () => {
        this.setState({
            toggleDropdownON:true
        })
    }

    render() {
        const {year, month} = this.state
        const {toggleDropdownON} = this.state
        const monthRange = range(12,1);
        const yearRange =range (9,-4).map(number =>number + year)

        return (
            <React.Fragment>
                <div ref={(ref)=>{this.node=ref}}>
                    <h2>选择月份</h2>
                    <button onClick={this.toggleDropdown}>{`${year}年 ${padLeft(month)}月`}</button>
                </div>
                { toggleDropdownON &&
                    <div className="dropdown-menu">
                        <div>
                            {yearRange.map((Number,index) =>
                                <a>
                                    {Number}年
                                </a>
                            )}
                        </div>
                        <div>
                            {monthRange.map((Number,index) =>
                                <a>
                                    {padLeft(Number)}月
                                </a>
                            )}
                        </div>
                    </div>


                }
            </React.Fragment>
        );
    }
}

export default MonthPicker