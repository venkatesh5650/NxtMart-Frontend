import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import FoodCategory from '../FoodCategory'

import './index.css'

const statusVariables = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [status, setStatus] = useState(statusVariables.initial)
  const [productsData, setProductsData] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  // 🔹 Keep cart in React state
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('cartData')) || [],
  )

  const extractPrice = priceString => {
    // Extract digits only
    const num = priceString.replace(/[^0-9.]/, '')
    return Number(num) || 0
  }

  const onAddCart = product => {
    // Get existing cart from localStorage (persistent)
    const existingCart = JSON.parse(localStorage.getItem('cartData')) || []
    const updatedCart = [...existingCart]

    // Find the product index in cart
    const existingCartIndex = updatedCart.findIndex(
      item => item.id === product.id,
    )

    // ✅ Update cartData (stored in localStorage)
    if (existingCartIndex >= 0) {
      updatedCart[existingCartIndex].count += 1
    } else {
      updatedCart.push({
        ...product,
        price:
          typeof product.price === 'number'
            ? product.price
            : extractPrice(product.price),
        count: 1,
      })
    }

    // Save cartData to localStorage
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
    setCartList(updatedCart)

    // ✅ Update productsData (in state only, not in localStorage)
    setProductsData(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        products: category.products.map(productItem =>
          productItem.id === product.id
            ? {...productItem, count: (productItem.count || 0) + 1}
            : productItem,
        ),
      })),
    )
  }

  const getProducts = async () => {
    setStatus(statusVariables.loading)
    const url = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      setProductsData(data.categories)
      setStatus(statusVariables.success) // ✅ should be success, not failure
    } else {
      setStatus(statusVariables.failure)
      console.log('Failed to fetch products')
    }
  }

  const CategoriesList = [{id: 0, categoryName: 'All'}]
  for (let i = 1; i < productsData.length; i += 1) {
    CategoriesList.push({id: i, categoryName: productsData[i].name})
  }

  const scrollToCategory = categoryName => {
    if (categoryName === 'All') {
      const productsSection = document.querySelector('ProductTypesContainer')
      if (productsSection) {
        productsSection.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    } else {
      const section = document.getElementById(categoryName)
      if (section) {
        section.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }
  }

  useEffect(() => {
    getProducts()
  }, []) // run only once when component mounts

  console.log(productsData)

  const successView = () => (
    <div className="HomeContainer">
      <Header />
      <div className="HomeSection">
        <div className="CategorySection">
          <h1 className="CategoryHeader">Categories</h1>
          <ul className="CategoryContainer">
            {CategoriesList.map(eachCategory => (
              <li className="CategoryItem" key={eachCategory.categoryId}>
                <button
                  type="button"
                  className={
                    activeCategory === eachCategory.categoryName
                      ? 'activeCategoryBtn'
                      : 'CategoryBtn'
                  }
                  onClick={() => {
                    setActiveCategory(eachCategory.categoryName)
                    scrollToCategory(eachCategory.categoryName) // ✅ smooth scroll
                  }}
                >
                  {eachCategory.categoryName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="ProductsSection">
          {productsData.map(eachProduct => (
            <div className="ProductTypesContainer" key={eachProduct.name}>
              <FoodCategory
                productDetails={eachProduct}
                onAddCart={onAddCart}
                cartList={cartList}
                setCartList={setCartList}
                productsData={productsData}
                setProductsData={setProductsData}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="headerMobile">
        <Header />
      </div>
    </div>
  )

  const retryResults = () => {
    getProducts()
  }

  const loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="green" height={50} width={50} />
    </div>
  )

  const failureView = () => (
    <div className="failureContainer">
      <div className="failureCard">
        <img
          src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1759299664/Group_7519_aucu01.png"
          alt="failure view"
          className="failureImg"
        />
        <h1 className="failureHead">Oops! Something went wrong.</h1>
        <p className="failurePara">We are having some trouble.</p>
        <button type="button" className="retryBtn" onClick={retryResults}>
          Retry
        </button>
      </div>
    </div>
  )

  const displayResult = () => {
    switch (status) {
      case statusVariables.loading:
        return loadingView()
      case statusVariables.success:
        return successView()
      case statusVariables.failure:
        return failureView()
      default:
        return null
    }
  }

  return <div>{displayResult()}</div>
}

export default Home
