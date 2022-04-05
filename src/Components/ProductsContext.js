import React, { useState,useEffect} from 'react'
import { db } from '../firebase'
import CategoryProducts from './CategoryProducts';


import 'bootstrap/dist/css/bootstrap.min.css';



const Prod = () => {
  const [loading, setLoading] = useState(true);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsFromFirebase = [];
    const subscriber = db
      .collection("Products")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getProductsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setProducts(getProductsFromFirebase);
        setLoading(false);
      });

    // return cleanup function
    return () => subscriber();
  }, [loading]); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }

  return (
    <div className="container">
      <h1>Products:</h1>
      {Products.length > 0 ? (
        Products.map((item) => <CategoryProducts
        id= {item.id}
        title= {item.title}
        image= {item.image}
        price= {item.price}
        rating= {item.rating}
        descr={item.descr}
/>
      )) : (
        <h1>no answers yet :(</h1>
      )}
    </div>
  );
};

export default Prod


