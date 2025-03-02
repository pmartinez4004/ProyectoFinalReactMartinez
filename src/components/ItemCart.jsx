import "./ItemCart1.css"
import { useContext } from "react"
import { listCartContext } from '../context/ProductsContext';
const ItemCart = ({ id, title, image, price, quantity }) => {

    const { removeFromCart } = useContext(listCartContext)

    return (
        <div className="itemCart">

            <div className="img">
                <img src={image}></img>
            </div>
            
            <span className="description-cantidad">
                <span className="quantity1">{` ${title}  `}</span>
            </span>
            <span className="cantidad1">
                <span className="quantity" >{`Cantidad: ${quantity} `} </span>
               
            </span>

            <div className="price">
                <span className="subtotal">Subtotal</span>
                <span className="price">${price * quantity}</span>
            </div>

            <button className="delete" onClick={() => removeFromCart(id)}>
                X
            </button>
        </div>
    )
}

export default ItemCart