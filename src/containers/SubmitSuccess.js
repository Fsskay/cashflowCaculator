import {Result, Button} from 'antd';
import React, {Component} from "react";


class SubmitSuccess extends Component {
    constructor(props) {
        super(props);
    }

    oneMore = () => {
        this.props.history.push('/create')
    }

    backHome = () => {
        this.props.history.push('/')
    }


    render() {
        return (
            <React.Fragment>
                <Result
                    status="success"
                    title="添加项目成功!"
                    subTitle="请确定您的下一步操作"
                    extra={[
                        <Button type="primary" key="oneMore" onClick={this.oneMore}>
                            再填一条
                        </Button>,
                        <Button key="back" onClick={this.backHome}>返回主页</Button>,
                    ]}
                />
            </React.Fragment>
        )
    }
}

export default SubmitSuccess