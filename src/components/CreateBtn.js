import React from "react";

const CreatBtn = ({CreateBtnOnClick}) =>(
    <button
        className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
        style={{marginTop:5}}

        onClick={(event)=>{CreateBtnOnClick()}}>
        创建一个新的记账记录

    </button>
)

export default CreatBtn