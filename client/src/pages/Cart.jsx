import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import '../styles/cart.scss'
import '../styles/products.scss'
import CartCard from '../components/CartCard'

const Cart = ({
  clearCartOfItems,
  cartContents,
  cartCounter,
  removeItemFromCart,
  addItemToCart
}) => {
  const [value, setValue] = useState(0)

  const getPrice = operator => {
    return operator
      ? cartContents.forEach(item => {
          setValue(previousValue => previousValue + item.price)
        })
      : cartContents.forEach(item => {
          setValue(previousValue => previousValue - item.price)
        })
  }

  const resetCartValue = () => {
    setValue(0)
  }

  useEffect(() => {
    localStorage.setItem('cartContents', JSON.stringify(cartContents))
    getPrice(true)
  }, [cartContents])

  return (
    <div>
      <Navigation cartCounter={cartCounter} />
      <main className='cart_page'>
        <div className='page-header'>
          <h1>Cart</h1>
          <p>Your current items: </p>
        </div>
        <ul className='products_wrapper'>
          {cartContents.map((item, key) => (
            <CartCard
              totalValue={value}
              getPrice={getPrice}
              item={item}
              removeItemFromCart={removeItemFromCart}
              addItemToCart={addItemToCart}
            />
          ))}
        </ul>
        <h1>Your item total is ${value}.</h1>
        <Button buttonLabel={'CHECKOUT'} />
        <Button
          handleClick={() => {
            resetCartValue()
            clearCartOfItems()
          }}
          buttonLabel={'EMPTY CART'}
        />
      </main>
    </div>
  )
}

export default Cart
