// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

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
      {/* <div> */}
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button">Continue Shopping</button>
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
      <div>
        <div>
          <img src={imageUrl} alt="product" />
        </div>
        <div>
          <h1>{title}</h1>
          <p>Rs {price}/-</p>
          <div>
            <div>
              <p>{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
              />
            </div>
            <p>{totalReviews} Reviews</p>
          </div>
          <p>{description}</p>
          <p>
            <span>Available:</span>
            {availability}
          </p>
          <p>
            <span>Brand:</span>
            {brand}
          </p>
          <hr />
          <div>
            <button type="button" onClick={this.decreaseCount} testid="minus">
              <BsDashSquare />
            </button>

            <p>{count}</p>
            <button type="button" onClick={this.increaseCount} testid="plus">
              <BsPlusSquare />
            </button>
          </div>
          <button type="button">ADD TO CART</button>
        </div>
        <h1>Similar Products</h1>
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
