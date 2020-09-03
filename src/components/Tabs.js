import React, {Component} from "react";

export class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeIndex:props.activeIndex
        }
    }

    TabsChange = (event,index)=>{
        event.preventDefault()
        this.setState({
            activeIndex:index
        })
        this.props.onChangeTabs(index)
    }




    render() {
        const {children} = this.props
        const {activeIndex} = this.state
        return (
            <ul>
                {
                    React.Children.map(children,(child,index)=>{
                        const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link';
                        return (
                            <li>
                                <a href="#"
                                   key={index}
                                   onClick={(event) => {this.TabsChange(event,index)}}
                                   className={activeClassName}
                                   >
                                   {child}

                                   </a>
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
