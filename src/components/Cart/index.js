import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import Header from '../Header'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => {
  const [Cartlist, setCartlist] = useState(
    () => JSON.parse(localStorage.getItem('cartData')) || [],
  )
  const [checkout, setCheckout] = useState(false)
  const [TotalAmount, SetTotalAmount] = useState(0)

  const history = useHistory()

  // Function to redirect to home
  const RedirectToHome = () => {
    history.replace('/')
    setCheckout(false)
    localStorage.removeItem('cartData')
  }

  const BackToHome = () => {
    history.replace('/')
  }

  const updateLocalStorage = updatedCart => {
    setCartlist(updatedCart)
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
  }

  const increaseQuantity = index => {
    const updatedCartList = [...Cartlist]
    updatedCartList[index].count = Number(updatedCartList[index].count) + 1
    updateLocalStorage(updatedCartList)
  }

  const decreaseQuantity = index => {
    const updatedCartList = [...Cartlist]
    if (updatedCartList[index].count > 1) {
      updatedCartList[index].count = Number(updatedCartList[index].count) - 1
      updateLocalStorage(updatedCartList)
    } else {
      updatedCartList.splice(index, 1)
      updateLocalStorage(updatedCartList)
    }
  }

  const cartLength = Cartlist.length

  const getNumericPrice = priceString => {
    if (!priceString) return 0
    // Remove any non-digit characters except decimal point
    const numeric = priceString.toString().replace(/[^0-9.]/g, '')
    return Number(numeric) || 0
  }

  useEffect(() => {
    const total = Cartlist.reduce((acc, eachCart) => {
      const price = getNumericPrice(eachCart.price) // ✅ convert string to number
      const qty = Number(eachCart.count) || 0
      return acc + price * qty
    }, 0)
    SetTotalAmount(total)
  }, [Cartlist])

  return (
    <div className="CartContainer">
      <Header />

      {checkout ? (
        <div className="CheckoutContainer">
          <div className="CheckOuts">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="SuccessContainer">
                ✅ {/* Placeholder for SuccessIcon */}
              </div>

              <h1 className="PaymentSuccess">Payment Successful</h1>
              <p className="GreetMsg">Thank you for Ordering</p>
              <p className="GreetMsg">
                Your Payment is Successfully Completed.
              </p>
              <button
                className="ReturnBtn"
                type="button"
                onClick={RedirectToHome}
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {cartLength > 0 && (
            <div className="checkoutHeader">
              <button type="button" onClick={BackToHome}>
                <img
                  src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1759229602/arrow-left_bg5p82.png"
                  className="logoutArrow"
                  alt="back"
                />
              </button>
              <h1 className="CartHeader">Checkout</h1>
            </div>
          )}

          <div className="CartsView">
            {cartLength > 0 ? (
              <div className="CartItemsContainer">
                {Cartlist.map((cartItem, index) => (
                  <CartItem
                    key={cartItem.id}
                    itemDetails={cartItem}
                    Increase={() => increaseQuantity(index)}
                    Decrease={() => decreaseQuantity(index)}
                  />
                ))}
              </div>
            ) : (
              <div className="EmptyCartContainer">
                <img
                  data-testid="empty cart"
                  src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1759240431/Group_8_bsrhtp.png"
                  className="EmptyCart"
                  alt="empty cart"
                />
                <h1 className="EmptyCartMsg">Your Cart is empty</h1>
              </div>
            )}
          </div>
          {cartLength > 0 && (
            <div className="BillContainer">
              <p className="BillMsg">Total ({cartLength} items) : ₹ </p>
              <p className="BillMsg" data-testid="total-price">
                {TotalAmount.toFixed(0)}
              </p>

              <button
                type="button"
                className="CheckoutButton"
                onClick={() => setCheckout(true)}
              >
                Checkout
              </button>
            </div>
          )}
          <div className="QueryContainer">
            <div className="ContactMedia">
              <p className="QueryText">
                For any queries, contact +91-9666677770 or mail us
                help@nxtmart.co.in
              </p>
              <div className="MediaContainer">
                <div className="Media">
                  <img
                    src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1758960905/Vector_3_nnhcdv.png"
                    className="brandImg"
                    alt="icon"
                  />
                </div>
                <div className="Media">
                  <img
                    src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1758960949/Vector_4_sjdo05.png"
                    className="brandImg"
                    alt="icon"
                  />
                </div>
                <div className="twitInsta">
                  <img
                    src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1758961001/path3611_k6dl5h.png"
                    className="brandImg"
                    alt="icon"
                  />
                </div>
                <div className="twitInsta">
                  <img
                    src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1758961044/instagram_pumouz.png"
                    className="brandImg"
                    alt="icon"
                  />
                </div>
              </div>
            </div>
            <p className="CopyRight">
              Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd
            </p>
          </div>
        </div>
      )}
      <div className="headerMobile">
        <Header />
      </div>
    </div>
  )
}

export default Cart
