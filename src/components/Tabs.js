import React, {Component} from "react";

export class Tabs extends React.Component {
    constructor(props) {
        super(props);

    }





    render() {
        const {children} = this.props

        return (
            <ul>
                {
                    React.Children.map(children,(child,index)=>{
                        return (
                            <li>
                                <a href="#"
                                   key={index}
                                   onClick={(event) => {this.props.onChangeTabs(index)}}>{child}</a>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

export const Tab = ({children}) =>
    <React.Fragment>{children}</React.Fragment>
