import React, { useState } from "react";
import { useContext } from "react";
import { listCartContext } from '../context/ProductsContext';
import "./Checkout.css"
import ItemCart from "./ItemCart";
import {
    sendOrder
} from '../firebase/firebase.js';
import ReactLoading from 'react-loading'

<h1>Checkout</h1>

const Formulario = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
    });
    const { listCart, clearCart } = useContext(listCartContext);

    const [orderId, setOrderId] = useState(null)
    const [loading1, setLoading1] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Listo para enviar datos")
        const order = {
            buyer: formData,
            items: listCart.map(product => ({
                id: product.id,
                title: product.title,
                quantity: product.quantity,
                price: product.price
            })),
            totalCarrito: listCart.reduce(
                (acumulador, product) => acumulador + product.price * product.quantity,
                0,
            )

        }
       
        console.log("Datos" + JSON.stringify(order))
        setLoading1(true)
        try {
            await sendOrder(order).then((id) => {
                setOrderId(id)
                setLoading1(false)
                clearCart()
            })
            console.log("orden enviada correctamente")
            setFormData({ nombre: "", email: "", telefono: "" }); // Reiniciar el formulario
        } catch (error) {
            console.error("Error al enviar los datos: ", error);
        }

    };

    return (
        <>

            <div className="contenedorCheckout">
                <div className="tituloCheck">
                    <h2 className="tituloForm">Por favor ingrese sus datos:</h2>
                    <form className="formularioGeneral" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                pattern="[A-Za-z\s]+"
                                title="El nombre debe contener solo letras y espacios"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                title="Introduce un email válido"
                            />
                        </div>
                        <div>
                            <label htmlFor="telefono">Teléfono:</label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{10}"
                                title="El teléfono debe tener 10 dígitos"
                            />
                        </div>
                        <button type="submit">Enviar Orden de Pedido</button>
                    </form>
                </div>


                <div className="containerItemsCart">
                    <h2>Contenido del carrito:</h2>
                    {
                        (listCart.length === 0) ? <span className="emptyCart">Tu carrito esta vacio, ¡llenalo!</span>
                            : listCart.map(product => (
                                <ItemCart
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    quantity={product.quantity}
                                    price={product.price}
                                />
                            ))
                    }
                    <div className="tituloTotal">Total carrito: $
                        {listCart.reduce(
                            (acumulador, product) => acumulador + product.price * product.quantity,
                            0,
                        )}

                    </div>
                </div>


                <div className="notificacionOrden">
                    {loading1 ? (
                        <div className='spinner1'>
                            <ReactLoading type="bars" color="gray" height="50px" width="100px" />
                        </div>
                    ) : (orderId && <p>Su numero de orden de pedido es   {orderId}</p>)
                    }

                </div>
            </div>

        </>
    );
}


export default Formulario


