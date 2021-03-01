import React from "react";

const TotalOutcome = ({income,outcome})=>(
    <div className="row">
        <div className="col">
            <h6  style={{color:"white"}}  className="income">被动收入：<br/><span style={{color:"red"}}>{income}</span></h6>
        </div>
        <br/>
        <div className="col">
            <h6  style={{color:"white"}}  className="outcome">弹性支出：<br/><span style={{color:'rgb(0, 123, 255)'}}>{outcome}</span></h6>
        </div>
    </div>
)

export default TotalOutcome