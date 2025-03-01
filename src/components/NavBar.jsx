import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent'
import BrandComponent from './BrandComponent'
import CartWidget from './CartWidgetComponent'
import './NavBar.css'
import CartContainer from './CartContainer';
import ContextCart from '../context/ContextCart';


export default function NavBar() {
  return (
    <>
      <ContextCart>
      <nav>
        <header>
          <div className='BrandComponent'>
          <Link to="/">
            <BrandComponent />
            </Link>
          </div>

          <nav className='ButttonComponents'>
            <Link to="category/electricidad">
              <ButtonComponent texto='Electricidad' />
            </Link>
            <Link to="category/iluminacion">"
              <ButtonComponent texto='Iluminación' />
            </Link>
            <Link to="/category/accesorios">
              <ButtonComponent texto='Accesorios ' />
            </Link>
          </nav>

          <div className='CartWidget'>
            <CartWidget />
          </div>
          <CartContainer/>
        </header>
      </nav>
      </ContextCart>
    </>
  );
}
