import React from "react";

const TotalPrice = ({income,outcome})=>(
    <div className="row">
        <div className="col">
            <h4 className="income">收入：<span>{income}</span></h4>
        </div>
        <div className="col">
            <h4 className="outcome">支出：<span>{outcome}</span></h4>
        </div>
    </div>
)

export default TotalPrice