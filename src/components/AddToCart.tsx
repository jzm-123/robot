import React,{useContext} from "react";
import { appSetStateContext } from "../Appstate";
import { RobotProps } from "./Robot";
export const withAddToCart=(ChildComponent:React.ComponentType<RobotProps>)=>{
    // return class extends React.Component{}
    return (props)=>{
        const setState=useContext(appSetStateContext)
        const addToCart=(id,name)=>{
            if(setState){
                setState(state=>{
                    return {
                        ...state,
                        shoppingCart:{
                            items:[...state.shoppingCart.items,{id,name}]
                        }
                    }
                })
            }
        }
        return <ChildComponent {...props} addToCart={addToCart}></ChildComponent>
    }
}