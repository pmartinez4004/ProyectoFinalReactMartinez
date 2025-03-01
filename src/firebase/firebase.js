// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQmZgtVLbXV-UxZP4xVNtGd-gGlDjqaf0",
  authDomain: "e-commerce-76bcb.firebaseapp.com",
  projectId: "e-commerce-76bcb",
  storageBucket: "e-commerce-76bcb.firebasestorage.app",
  messagingSenderId: "655270746817",
  appId: "1:655270746817:web:10f0bd2f14e73533501240"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//obtener un producto
export async function getSingleProduct(id) {
  const documentRef = doc(db, 'products', id);

  try {
    const snapshot = await getDoc(documentRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      console.log('El documento no existe!');
    }
  } catch (error) {
    console.error('Error al obtener el documento: ', error);
  }
}

//obtener toda una coleccion
export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    if (querySnapshot.size !== 0) {
      const productsList = querySnapshot.docs.map((docu) => {
        return {
          id: docu.id,
          ...docu.data(),
        };
      });
      return productsList;
    } else {
      console.log('Coleccion vacía !');
    }
  } catch (error) {
    console.error('Error al obtener la coleccion: ', error);
  }
}

//filtros de precio
export async function filterProductsByPrice(price) {
  try {
    const filteredQuery = query(
      collection(db, 'products'),
      where('price', '<', price)
    );
    const querySnapshot = await getDocs(filteredQuery);
    if (querySnapshot.size !== 0) {
      const productsList = querySnapshot.docs.map((docu) => {
        return {
          id: docu.id,
          ...docu.data(),
        };
      });
      return productsList;
    } else {
      console.log('Coleccion vacía !');
    }
  } catch (error) {
    console.error('Error al obtener el documento: ', error);
  }
}

export async function filterProductsByCategory(category) {
  try {
    const filteredQuery = query(
      collection(db, 'products'),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(filteredQuery);
    if (querySnapshot.size !== 0) {
      const productsList = querySnapshot.docs.map((docu) => {
        return {
          id: docu.id,
          ...docu.data(),
        };
      });
      return productsList;
    } else {
      console.log('Coleccion vacía !');
    }
  } catch (error) {
    console.error('Error al obtener el documento: ', error);
  }
}

//agregar una nueva orden de pedido
export async function sendOrder(order) {
  const ordersCollection = collection(db, 'orders');
  try {
    const docRef = await addDoc(ordersCollection, order);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar el documento nuevo ', error);
  }
}

//actualizar un producto
export async function updateProduct(id, toUpdate) {
  const itemDocRef = doc(db, 'products', id);
  try {
    await updateDoc(itemDocRef, toUpdate);
    alert('Se actualizo el producto!');
  } catch (error) {
    console.log('Hubo un error al actualizar!', error);
  }
}

//actualizar multiples productos
export async function updateMultiple() {
  const batch = writeBatch(db); //creando el batch

  const docRef1 = doc(db, 'products', 'ZjkF4RdijYUaR3gseS30');
  const docRef2 = doc(db, 'orders', '0Nu9HbjYKc7hmS67nNzd');

  batch.update(docRef1, { description: 'usb Logitech' });
  batch.update(docRef2, { total: 1212 });

  try {
    await batch.commit(); //ejecuta todas las actualizaciones juntas
  } catch (error) {
    console.log(error);
  }
}
