// Write your code here

import {Link} from 'react-router-dom'
import './index.css'

const SimilarProductItem = props => {
  const {details} = props
  const {
    availability,
    brand,
    id,
    description,
    imageUrl,
    price,
    rating,
    style,
    title,
    totalReviews,
    similarProducts,
  } = details

  return (
    <li>
      <div>
        <img src={imageUrl} alt="similar product" />
        <h1>{title}</h1>
        <p>By {brand}</p>
        <div className="price-rating-container">
          <p>Rs {price}/- </p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
