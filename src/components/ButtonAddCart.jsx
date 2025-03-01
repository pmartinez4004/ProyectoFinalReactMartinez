import { useContext } from "react";
import React, { useState } from 'react';
import { listCartContext } from '../context/ProductsContext';


const ButtonAddCart = ( {id, quantity} ) => {
    
    let {addProduct } = useContext(listCartContext)
    
    const handlerClick = () => { 
        let qty=1
        if(quantity){
            qty=quantity
        }
        addProduct(id,qty)
    }
    
    return(
        <button id="addCart" onClick={handlerClick}>
            agregar {id}
        </button>
    )
}

export default ButtonAddCart;