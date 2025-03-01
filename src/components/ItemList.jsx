import ProductCard from './ProductCard';

export default function ItemList({products}) {
    return (
        <div className="contenedorTarjetas">
            
            <div className="tarjetas">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};