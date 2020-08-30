import React from "react";

const CreatBtn = ({CreateBtnOnClick}) =>(
    <button onClick={(event)=>{CreateBtnOnClick()}}>
        创建一个新的记账记录
    </button>
)

export default CreatBtn