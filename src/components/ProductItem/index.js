import './index.css'

const ProductItem = props => {
  const {productDetails, onAddCart, Increase, Decrease} = props
  const {id, name, price, weight, image, count} = productDetails

  const extractPrice = priceString => {
    const str = String(priceString) // ✅ ensure it's a string
    const num = str.replace(/[^0-9.]/g, '')
    return Number(num) || 0
  }

  return (
    <li className="productItem" data-testid="product">
      <img className="ProductImg" src={image} alt={name} />
      <div className="DetailsSection">
        <div>
          <h4 className="productName">{name}</h4>
          <p className="productQuantity">{weight}</p>
          <h4 className="productPrice">₹ {price}</h4>
        </div>
        <div>
          {count > 0 ? (
            <div className="ControllerSec">
              <button
                data-testid="increment-count"
                type="button"
                className="ControllerIcon"
                onClick={() => Increase(id)}
              >
                +
              </button>

              <p data-testid="active-count" className="Quantitys">
                {count}
              </p>

              <button
                data-testid="decrement-count"
                type="button"
                className="ControllerIcon"
                onClick={() => Decrease(id)}
              >
                -
              </button>
            </div>
          ) : (
            <button
              data-testid="add-button"
              type="button"
              className="AddCartBtn"
              onClick={() =>
                onAddCart({
                  ...productDetails,
                  price: extractPrice(productDetails.price),
                })
              } // ✅ price numbersure numeric price
            >
              Add
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

export default ProductItem
