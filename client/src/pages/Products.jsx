import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/products.scss'
import Navigation from '../components/Navigation'
import Card from './Card'
import Footer from '../components/Footer'

const Products = props => {
  const [products, setProducts] = useState([])
  const API_ADDRESS = 'http://localhost:3001/api/products'
  useEffect(() => {
    axios.get(API_ADDRESS).then(response => {
      setProducts(response.data)
    })
  }, [])

  return (
    <div>
      <Navigation />
      <div className='products_page'></div>

      <main>
        <div className='page-header'>
          <h1>Products</h1>
          <section className='products_wrapper'>
            {products.map((product, index) => (
              <Card
                className='card'
                key={index}
                addItemToCart={props.addItemToCart}
                productName={product.title}
                productDescription={product.description}
                productImage={product.filename}
                productPrice={product.price}
              />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Products