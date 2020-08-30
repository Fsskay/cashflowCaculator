import React, {Component} from "react";

export class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex:props.activeIndex
        }
    }

    render() {
        const {children} = this.props
        const {activeIndex} = this.state;
        return (
            <ul>
                {
                    React.Children.map(children,(child,index)=>{
                        return (
                            <li>
                                <a href="#" key={index}>{child}</a>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

export const Tab = ({children}) =>
    <React.Fragment>children</React.Fragment>
