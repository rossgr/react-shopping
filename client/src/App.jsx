import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss'
import About from './pages/About'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import Cart from './pages/Cart'

function App () {
  const cartLocalStorage =
    JSON.parse(localStorage.getItem('cartContents')) || []
  const [cart, setCart] = useState(cartLocalStorage)
  const [cartCounter, setCartCounter] = useState(cartLocalStorage.length)

  const addItemToCart = (
    productName,
    productPrice,
    productDescription,
    productImage,
    productId,
    index
  ) => {
    // check if item already exists in cart [if so duplicate.]
    const item = {
      name: productName,
      price: productPrice,
      info: productDescription,
      image: productImage,
      id: productId,
      amount: 1
    }

    try {
      const foundItem = cart.find(product => product.id === productId)
      const alteredFound = { ...foundItem, amount: foundItem.amount++ }

      setCart(
        cart.map(product => (product.id === item.id ? alteredFound : item))
      )
      setCartCounter(cartCounter + 1)
    } catch (error) {
      setCart(cart => [...cart, item])
    }

    console.log(cart)
  }

  const removeItemFromCart = item => {
    setCart(cart.filter(product => product.id === item.id))
    setCartCounter(cartCounter - 1)
  }

  const clearCartOfItems = () => {
    setCart([])
    setCartCounter(0)
  }

  return (
    <div className='site'>
      <BrowserRouter>
        <Switch>
          <Route path='/products'>
            <Products addItemToCart={addItemToCart} cartCounter={cartCounter} />
          </Route>
          <Route path='/about'>
            <About cartCounter={cartCounter} />
          </Route>
          <Route path='/cart'>
            <Cart
              clearCartOfItems={clearCartOfItems}
              cartContents={cart}
              cartCounter={cartCounter}
              removeItemFromCart={removeItemFromCart}
            />
          </Route>
          <Route path='/'>
            <Homepage cartCounter={cartCounter} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
