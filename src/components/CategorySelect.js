import React, {Component} from "react";

class CategorySelect extends Component{
 constructor(props) {
     super(props);
 }

 selectCategory2=(event,category)=>{
     this.props.onSelectCategory(category)
     event.preventDefault()
 }


 render() {
     const {CategoriesOfSelect} = this.props
     console.log('Categories',CategoriesOfSelect);
     return (

         <div>
             {
                 CategoriesOfSelect.map((category,index)=>{
                     return(
                         <div onClick={(event)=>{this.selectCategory2(event,category)}}>
                             <p>{category.name}</p>
                         </div>
                     )
                 })
             }


         </div>
     );
 }

}

export default CategorySelect