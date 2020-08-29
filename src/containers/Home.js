import React, {Component} from "react";
import {Tabs, Tab} from '../components/Tabs'
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker"
import CreateBtn from "../components/CreateBtn";
import {parseToYearAndMonth} from '../unility'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate:parseToYearAndMonth()
        }
    }
    changeDate =(year,month)=>{

    }

    render() {
        const {currentDate} =this.state
        return (
            <React.Fragment>
            <div>
                <MonthPicker
                    year={currentDate.year}
                    month={currentDate.month}
                    onChange={this.changeDate}
                />
            </div>
            </React.Fragment>
        )
    }
}

export default Home