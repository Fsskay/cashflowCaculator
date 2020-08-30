import React from "react";

const TotalPrice = ({income,outcome})=>(
    <div>
        <div>收入:<span>{income}</span></div>
        <div>支出:<span>{outcome}</span></div>
    </div>
)

export default TotalPrice