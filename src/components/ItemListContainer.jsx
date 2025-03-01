import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ItemListContainer.css"
import ItemList from './ItemList.jsx';
import {
  getProducts,
  filterProductsByCategory,
} from '../firebase/firebase.js';
import ReactLoading from 'react-loading'

export default function ItemListContainer() {
  const [products1, setProducts1] = useState(null);
  const { catId } = useParams();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!catId) {
      getProducts().then((products) => {
        setProducts1(products);
        setLoading(false)
      });
    } else {
      filterProductsByCategory(catId).then((response) => setProducts1(response));
    }
  }, [catId]);

  return (
    <>
      {loading ? (
        <div className='spinner1'>
          <ReactLoading type="bars" color="gray" height="50px" width="100px" />
        </div>
      ) :
        <ItemList products={products1} />
      }
    </>

  );
}
