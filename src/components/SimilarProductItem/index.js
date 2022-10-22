// Write your code here
import {Link} from 'react-router-dom'

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
        <p>Rs {price}/-</p>
        <div>
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
