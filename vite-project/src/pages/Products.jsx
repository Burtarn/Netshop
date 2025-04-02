import React from 'react'
import UserInfo from '../components/UserInfo/UserInfo'
import Jeans from './Subpages/JeansPage'
import Tshirt from './Subpages/TshirtPage'
import ShirtsPage from './Subpages/ShirtsPage';
import OthersPage from './Subpages/OthersPage';


const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      < UserInfo />
      < Jeans />
      < Tshirt />
      < ShirtsPage />
      < OthersPage />
    </div>
  )
}

export default Products;