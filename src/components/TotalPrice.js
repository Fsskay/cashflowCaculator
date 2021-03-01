import React from "react";

const TotalPrice = ({income,outcome})=>(
    <div className="row">
        <div className="col">
            <h5 style={{color:"white"}} className="income">总收入：<br/><span style={{color:"red"}}>{income}</span></h5>
        </div>
        <div className="col">
            <h5  style={{color:"white"}} className="outcome">总支出：<br/><span style={{color:'rgb(0, 123, 255)'}}>{outcome}</span></h5>
        </div>
    </div>
)

export default TotalPrice