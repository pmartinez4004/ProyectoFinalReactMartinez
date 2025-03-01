
import { createContext } from "react";
import { useEffect, useState } from 'react';
import {
    getProducts,
} from '../firebase/firebase.js';


export const listCartContext = createContext(null);

const ProviderContextoListCart = ({ children }) => {

    const [listCart, setListCart] = useState([]);

    const [products, setProducts] = useState(null);


    useEffect(() => {
        getProducts().then((products) => setProducts(products)
        )
    });


    const addProduct = (id, quantity) => {
        const producAdd = products.find(product => product.id === id)
        
        if (isInCart(producAdd.id)) {
            setListCart(
                listCart.map((product) => {
                    return product.id === producAdd.id
                        ? { ...product, quantity: product.quantity + quantity }
                        : product;
                }),
            );
        } else {
            setListCart([...listCart, { ...producAdd, quantity }]);
        }
    };

    const totalPrice = () => {
        return listCart.reduce((prev, act) => prev + act.quantity * act.price, 0);
    };

    const totalProducts = () =>
        listCart.reduce(
            (acumulador, productoActual) => acumulador + productoActual.quantity,
            0,
        );

    const isInCart = (id) =>
        listCart.find((product) => product.id === id) ? true : false;


    const clearCart = () => {
        setListCart([]);
    }

    const removeFromCart = (id) => {
        const updateList = listCart.filter(product => product.id !== id)
        setListCart(updateList);
    }

    return (
        <listCartContext.Provider value={{ removeFromCart, listCart, addProduct, clearCart, totalPrice }}>
            {children}
        </listCartContext.Provider>
    );
}

export default ProviderContextoListCart