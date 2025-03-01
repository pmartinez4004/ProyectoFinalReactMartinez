import myImage from '../img/logoJr.jpg'; 
import './BrandComponent.css'

export default function BrandComponent (){
  return (
    <div>
      <img className= 'miImagen' src={myImage} alt="Logo" />
    </div>
  );
};



