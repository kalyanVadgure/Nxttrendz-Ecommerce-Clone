import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachProduct => {
      if (eachProduct.id === id) {
        const {quantity} = eachProduct
        let decresedQuantity = quantity - 1
        if (decresedQuantity < 1) {
          decresedQuantity = 1
        }

        const updatedProduct = {...eachProduct, quantity: decresedQuantity}
        return updatedProduct
      }

      return eachProduct
    })

    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachProduct => {
      if (eachProduct.id === id) {
        const {quantity} = eachProduct
        const incresedQuantity = quantity + 1

        const updatedProduct = {...eachProduct, quantity: incresedQuantity}
        return updatedProduct
      }

      return eachProduct
    })

    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    console.log(product)
    console.log(product.id)
    console.log(cartList.includes(product))
    const isPresent = cartList.findIndex(
      eachProduct => eachProduct.id === product.id,
    )

    console.log(isPresent)
    if (isPresent !== -1) {
      this.incrementCartItemQuantity(product.id)
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
