import React from 'react'
import "./Product.css"
import { useStateValue } from "./StateProvider"

function Product({id, title, image, price, rating}) {

  const [{basket}, dispatch] = useStateValue();

  const addToBasket = () => {
      dispatch({
        type: 'ADD_TO_BASKET',
        item:{
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      });
  };

  return (
    <div className='product'>
      <div class="product_info">
        <p className='product_title'>{title}</p>
        <p className='product_price'><small>$</small><strong>{price}</strong></p>
        <div class="product_rating">
          {Array(rating)
          .fill()
          .map((_, i) => (
             <p>⭐</p>
          ))}
         </div>
      </div>
      <img src={image} alt=""/>
    <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product