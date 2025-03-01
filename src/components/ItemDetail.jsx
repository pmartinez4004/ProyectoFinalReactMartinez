import ButtonAddCart from "./ButtonAddCart";
import Counter from "./Counter";
import React, { useState } from 'react';
import ItemCount from "./Counter";


export default function ItemDetail({ product }) {
    const [count, setCount] = useState(0);
    
    return (
        <>
            <p>ID: {product?.id}</p>
            <h3>Nombre: {product?.title}</h3>
            <img src={product?.image} alt="" />
            <p>Descripcion: {product?.description}</p>
            <p>Categoria: {product?.category}</p>
            <p>Precio ${product?.price}</p>
            <p>Stock {product?.stock}</p>
        </>
    );
}