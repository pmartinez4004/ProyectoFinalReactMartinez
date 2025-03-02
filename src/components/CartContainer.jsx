import "./CartContainer.css"
import ItemCart from "./ItemCart";
import { useContext } from "react";
import { controllerShowCart } from "../context/ContextCart";
import { Link } from 'react-router-dom';


import { listCartContext } from '../context/ProductsContext';
const ContainerCart = () => {

    const { cartShow, setCartShow } = useContext(controllerShowCart);
    const { listCart, clearCart } = useContext(listCartContext);

    const style = {
        display: cartShow
    }

    const closeCart = () => {
        setCartShow((cartShow === "none") ? "flex" : "none")
    }

    return (
        <div className="cart" style={style} >
            <div className="cerrar">
                <button className="close" onClick={closeCart}>
                    X Cerrar
                </button>
            </div>

            <div className="containerItemsCart">
                {
                    (listCart.length === 0) ? <span className="emptyCart">Tu carrito esta vacio, ¡llenalo!</span>
                        : listCart.map(product => (
                            <ItemCart
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                image={product.image}
                                quantity={product.quantity}
                                price={product.price}
                            />
                        ))
                }
            </div>
            <div className="totalCarrito">Total carrito: $
                {listCart.reduce(
                    (acumulador, product) => acumulador + product.price * product.quantity,
                    0,
                )}</div>

            <div className="terminarCompra">

                <button className="terminar" onClick={closeCart}>
                    <Link to="/Checkout"> Terminar compra</Link>
                </button>

                <button className="clear" onClick={clearCart}>
                    Vaciar carrito
                </button>
            </div>
        </div>

    )
}

export default ContainerCart