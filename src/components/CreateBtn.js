import React from "react";
import Ionicon from 'react-ionicons'

const CreatBtn = ({CreateBtnOnClick}) =>(
    <button
        className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
        style={{marginTop:5}}

        onClick={(event)=>{CreateBtnOnClick()}}>
        <Ionicon
            className="rounded-circle CreateBtn"
            fontSize="10px"
            color='#fff'
            icon='ios-add-circle'
        />
        <strong>创建一条新的收支记录</strong>

    </button>
)

export default CreatBtn