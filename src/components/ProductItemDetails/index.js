// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {fetchingStatus: apiStatusConstants.initial, data: {}, count: 1}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({fetchingStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const responseData = await response.json()
      const data = {
        availability: responseData.availability,
        brand: responseData.brand,
        id: responseData.id,
        description: responseData.description,
        imageUrl: responseData.image_url,
        price: responseData.price,
        rating: responseData.rating,
        style: responseData.style,
        title: responseData.title,
        totalReviews: responseData.total_reviews,
        similarProducts: responseData.similar_products.map(each => ({
          availability: each.availability,
          brand: each.brand,
          id: each.id,
          description: each.description,
          imageUrl: each.image_url,
          price: each.price,
          rating: each.rating,
          style: each.style,
          title: each.title,
          totalReviews: each.total_reviews,
        })),
      }
      console.log(data)
      this.setState({data, fetchingStatus: apiStatusConstants.success})
    } else {
      this.setState({fetchingStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="continue-shopping-button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  decreaseCount = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  increaseCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  renderSuccessView = () => {
    const {data, count} = this.state
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
    } = data
    return (
      <div className="item-container">
        <div className="main-product-container">
          <img src={imageUrl} alt="product" className="item-image" />

          <div className="text-container">
            <h1 className="title-heading">{title}</h1>
            <p className="price">Rs {price}/-</p>
            <div className="rating-review-container">
              <div className="rating-container">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="total-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="description">
              <span className="total-reviews">Available: </span>
              {availability}
            </p>
            <p className="description">
              <span className="total-reviews">Brand:</span>
              {brand}
            </p>
            <hr />
            <div className="count-container">
              <button
                type="button"
                className="count-button"
                onClick={this.decreaseCount}
                testid="minus"
              >
                <BsDashSquare className="icon" />
              </button>

              <p className="count-style">{count}</p>
              <button
                type="button"
                className="count-button"
                onClick={this.increaseCount}
                testid="plus"
              >
                <BsPlusSquare className="icon" />
              </button>
            </div>
            <button type="button" className="add-to-cart-button">
              ADD TO CART
            </button>
          </div>
        </div>

        <h1 className="similar-products-heading">Similar Products</h1>
        <ul>
          {similarProducts.map(each => (
            <SimilarProductItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderView = () => {
    const {fetchingStatus} = this.state
    switch (fetchingStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderView()}
      </>
    )
  }
}

export default ProductItemDetails
