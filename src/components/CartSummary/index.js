// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const noOfCartItems = cartList.length

      const totalPrice = cartList.map(eachProduct => {
        let total = 0
        const {quantity, price} = eachProduct
        total += quantity * price
        return total
      })

      return (
        <div className="total_order_container">
          <div>
            <h1>
              Order Total: <span>Rs {totalPrice[0]}/-</span>
            </h1>
            <p>{noOfCartItems} items in cart</p>
            <button type="button" className="checkout_button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
