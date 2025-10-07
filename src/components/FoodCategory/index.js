import ProductItem from '../ProductItem'
import './index.css'

const FoodCategory = props => {
  const {productDetails, onAddCart, setProductsData} = props

  const {cartList, setCartList} = props
  const {name, products} = productDetails

  const updateLocalStorage = updatedCart => {
    setCartList(updatedCart)
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
  }

  const extractPrice = priceString => {
    const num = priceString.replace(/[^0-9.]/g, '')
    return Number(num) || 0
  }

  const increaseQuantity = id => {
    const updatedCartList = cartList.map(item =>
      item.id === id
        ? {...item, count: Number(item.count) + 1} // ensure number
        : item,
    )
    updateLocalStorage(updatedCartList)
    setProductsData(prev =>
      prev.map(category => ({
        ...category,
        products: category.products.map(product =>
          product.id === id
            ? {...product, count: (product.count || 0) + 1}
            : product,
        ),
      })),
    )
  }

  const decreaseQuantity = id => {
    const updatedCartList = cartList
      .map(item =>
        item.id === id
          ? {...item, count: Number(item.count) - 1} // ensure number
          : item,
      )
      .filter(item => item.count > 0)
    updateLocalStorage(updatedCartList)

    setProductsData(prev =>
      prev.map(category => ({
        ...category,
        products: category.products.map(product =>
          product.id === id
            ? {...product, count: Math.max((product.count || 1) - 1, 0)}
            : product,
        ),
      })),
    )
  }

  return (
    <div className="categoryContainer" id={name}>
      <h1 className="categoryName">{name}</h1>
      <ul className="productsContainer">
        {products.map(product => {
          // Merge cart info only for count display in UI if needed

          const productWithCart = {
            ...product,
            price: extractPrice(product.price),
            count: product.count || 0, // Use count from productsData
          }

          return (
            <ProductItem
              key={product.id}
              productDetails={productWithCart}
              onAddCart={onAddCart}
              Increase={increaseQuantity}
              Decrease={decreaseQuantity}
              cartList={cartList}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default FoodCategory
