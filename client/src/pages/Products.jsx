import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/products.scss'
import Navigation from '../components/Navigation'
import Card from '../components/Card'

const Products = ({ addItemToCart, cartCounter }) => {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState(['All'])
  const API_ADDRESS = 'http://localhost:3001/api/products'
  useEffect(() => {
    axios.get(API_ADDRESS).then(response => {
      setProducts(response.data)
    })
  }, [])

  useEffect(() => {
    const e = {
      target: {
        value: 'all'
      }
    }
    productFilter(e)
  }, [])

  const productFilter = e => {
    const newFilterTag = e.target.value.toLowerCase()
    console.log(newFilterTag)
    if (newFilterTag === 'all') {
      console.log('stink')
      setFilter(null)
    } else {
      setFilter(newFilterTag)
    }
  }

  return (
    <div>
      <Navigation cartCounter={cartCounter} />
      <main>
        <div className='page-header'>
          <h1>Products</h1>
          <select
            onChange={productFilter}
            className='product_filter'
            aria-label='filter-by-type'
          >
            <option value='All'>Filter by Type</option>
            <option value='Keycaps'>Keycaps</option>
            <option value='Deskpads'>Deskpads</option>
            <option value='Keyboards'>Keyboards</option>
            <option value='Stabilisers'>Stabilisers</option>
            <span className='focus'></span>
          </select>
        </div>
        <section className='products_wrapper'>
          {filter
            ? products
                .filter(product => product.type === filter)
                .map((product, index) => (
                  <Card
                    className='card'
                    key={index}
                    addItemToCart={addItemToCart}
                    productName={product.title}
                    productDescription={product.description}
                    productImage={product.filename}
                    productPrice={product.price}
                    productId={product.id}
                    productRating={product.rating}
                  />
                ))
            : products.map((product, index) => (
                <Card
                  className='card'
                  key={index}
                  addItemToCart={addItemToCart}
                  productName={product.title}
                  productDescription={product.description}
                  productImage={product.filename}
                  productPrice={product.price}
                  productId={product.id}
                  productRating={product.rating}
                />
              ))}
          {}
        </section>
      </main>
    </div>
  )
}

export default Products
