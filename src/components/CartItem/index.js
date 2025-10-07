import './index.css'

const CartItem = ({itemDetails, Increase, Decrease}) => {
  const {name, image, price, count, weight} = itemDetails

  return (
    <div className="CartItemContainer" data-testid="cartItem">
      <div className="ItemContainer">
        <div className="ItemDetails">
          <img className="ItemImg" src={image} alt={name} />
          <div>
            <p className="ItemName">{name}</p>
            <p>{weight}</p>
            <p className="ItemPrice">{price}</p>
          </div>
        </div>
        <div className="Controller">
          <button
            data-testid="increment-quantity"
            type="button"
            className="ControllIcon"
            onClick={Increase}
          >
            +
          </button>

          <p data-testid="item-quantity" className="Quantity">
            {count}
          </p>
          <button
            data-testid="decrement-quantity"
            type="button"
            className="ControllIcon"
            onClick={Decrease}
          >
            -
          </button>
        </div>
      </div>
      <hr className="horline" />
    </div>
  )
}

export default CartItem
