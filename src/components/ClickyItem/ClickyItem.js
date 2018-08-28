import React from "react";
const style = {width:"100%", margin:"30px auto"};
//stupid thing needs a comment to commit.
const ClickyItem =(props)=>(
       <img src={"/build/"+props.src}onClick={props.onClick}  className= "text-center" alt={props.alt} style={style}/> 
)

export default ClickyItem