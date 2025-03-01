import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Checkout from './components/Checkout';
import Error404 from './components/Error404';
 
import ProviderContextoListCart from './context/ProductsContext'


function App() {
  return (
    <>
      <ProviderContextoListCart>
        <BrowserRouter>
          <NavBar />
          <Routes>
          <Route path="/" element={<ItemListContainer />} />
            <Route exact path="/category/:catId" element={<ItemListContainer />} />
            <Route exact path="/product/:id" element={<ItemDetailContainer />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error404 />} />
            

          </Routes>
        </BrowserRouter>
      </ProviderContextoListCart>
    </>
  );
}

export default App;
