import React from "react";

const TotalPrice = ({income,outcome})=>(
    <div className="row">
        <div className="col">
            <h6  style={{color:"white"}}  className="income">主动收入：<br/><span style={{color:"red"}}>{income}</span></h6>
        </div>
        <div className="col">
            <h6 style={{color:"white"}}  className="outcome">固定支出：<br/><span style={{color:'rgb(0, 123, 255)'}}>{outcome}</span></h6>
        </div>
    </div>
)

export default TotalPrice