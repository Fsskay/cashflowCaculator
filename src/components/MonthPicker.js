import React, {Component} from "react";
import {padLeft, range} from '../unility'

class MonthPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedYear: this.props.year,
            toggleDropdownON: false
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }

    handleClick = (event) => {
        if (this.node.contains(event.target)) {
            return;
        }
        this.setState({
            toggleDropdownON: false
        })

    }

    toggleDropdown = (event) => {
        event.preventDefault()
        this.setState({
            toggleDropdownON: !this.state.toggleDropdownON
        })
    }

    selectedYear = (event, yearNumber) => {
        event.preventDefault()
        this.setState({
            selectedYear: yearNumber
        })
    }

    selectedMonth = (event, monthNumber) => {
        event.preventDefault()
        this.setState({
            toggleDropdownON: false
        })
        this.props.onChange(this.state.selectedYear, monthNumber)
    }


    render() {
        const {year, month} = this.props
        const {selectedYear} = this.state
        const {toggleDropdownON} = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(number => number + year)

        return (
            <React.Fragment>
                <div className="dropdown month-picker-component" ref={(ref) => {
                    this.node = ref
                }}>
                    <h4>选择月份</h4>
                    <button onClick={this.toggleDropdown}
                            className="btn btn-lg btn-secondary dropdown-toggle">{`${year}年 ${padLeft(month)}月`}</button>

                    {toggleDropdownON &&
                    <div className="dropdown-menu" style={{display: 'block'}}>
                        <div className="row">
                            <div className="col border-right years-range">
                                {yearRange.map((yearNumber) =>
                                    <a
                                       className={(yearNumber === selectedYear) ? 'dropdown-item active text-white' : 'dropdown-item'}
                                       onClick={(event
                                       ) => {
                                           this.selectedYear(event, yearNumber)
                                       }}>
                                        {yearNumber}年
                                    </a>
                                )}
                            </div>
                            <div className="col months-range">
                                {monthRange.map((monthNumber) =>
                                    <a
                                        className={(monthNumber === month) ? 'dropdown-item active' : 'dropdown-item'}
                                        onClick={(event) => {
                                            this.selectedMonth(event, monthNumber)
                                        }}>
                                        {padLeft(monthNumber)}月
                                    </a>
                                )}
                            </div>
                        </div>

                    </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default MonthPicker