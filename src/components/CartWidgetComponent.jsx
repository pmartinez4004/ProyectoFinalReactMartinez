import myImage from '../img/cartJ.jpg';
import './CartWidgetComponent.css'
import { listCartContext } from '../context/ProductsContext';
import { useContext } from 'react';
import { controllerShowCart } from '../context/ContextCart';

function cantidadProductosCarrito() {  // contador items carrito
  const { listCart } = useContext(listCartContext)
  let contarProductos = 0
  if (Number(listCart.length) > 0) {
    contarProductos = listCart.reduce((cantidad, product) => cantidad + product.quantity, 0)
    return contarProductos
  }
}

const CartWidget = () => {
  const { setCartShow, cartShow } = useContext(controllerShowCart)
  const showCart = () => {
    setCartShow((cartShow === "none") ? "flex" : "none")
  }

  return (
    <div className="CartContainer" onClick={showCart}>
      <img className='imagenCarrito' src={myImage} alt="Carrito" />
      <span className='ContCarrito'>
        {cantidadProductosCarrito()}
      </span>
    </div> 
  )
}

export default CartWidget;