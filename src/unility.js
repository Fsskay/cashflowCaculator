export const LIST_VIEW = 'list';
export const CHART_VIEW = 'chart';
export const TYPE_INCOME = 'income';
export const TYPE_OUTCOME = 'outcome';


export const flatternArr = (arr) =>{
    return arr.reduce((map,item)=>{
        map[item.id] = item;
        return map
    },{})
};

export const parseToYearAndMonth = (str)=>{
    const date = str ? new Date(str):new Date()
    return {
        year:date.getFullYear(),
        month:date.getMonth()+1,
    }
}

export const padLeft = (n) => {
    return n < 10 ? '0' + n : n
};

export const range =(size,startAt=0) =>{
    const arr = []
    for (let i=0;i<size;i++){
        arr[i]=startAt+i
    }
    return arr
}

