import { useEffect, useState } from 'react';
import { useContext } from "react";
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import "./ItemDetailContainer.css";
import ItemCount from "./Counter";
import { listCartContext } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import {
  getProducts,
  getSingleProduct,
} from '../firebase/firebase.js';

export default function ItemDetailContainer() {
  const {addProduct } = useContext(listCartContext)
  const [goToCart, setGoToCart] = useState(false);
  const [stock2, setStock2] = useState();

  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    getSingleProduct(id).then((product) =>
      setProduct(product)
    )});
    
  const stock1=addProduct.stock

  const onAdd = (quantity)=>{
    setGoToCart(true)
    addProduct(id,quantity)
  }

  
return (
  <>
    <div className='tarjetaDetalle'>
      <ItemDetail product={product} />
      {goToCart ? (
        <Link to="/"> Volver</Link>
      ) : (
        product?.stock > 0 && <ItemCount initial={1} stock={product?.stock} onAdd={onAdd}/>
      )}
    </div>
  </>
);
}