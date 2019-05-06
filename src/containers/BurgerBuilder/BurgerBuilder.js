import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'

const BurgerBuilder = props => {
  const [purchasingState, setPurchasingState] = useState(false)

  useEffect(() => {
    props.onInitIngredients()
  }, [])

  const updatePurchase = ingredients => {
    const sum = Object.keys(ingredients) //creates an array of string entries
      .map(igKey => {
        return ingredients[igKey] //mapped the array and return ingredients with a "key" of the ingredient number
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasingState(true)
    } else {
      props.onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasingState(false)
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase()
    props.history.push('/checkout')
  }

  const disabledInfo = {
    ...props.ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  } //{sald: true, meat: false, ...} if true, button is disabled
  let orderSummary = null
  let burger = props.error ? (
    <p>Ingredients can't be loaded... </p>
  ) : (
    <Spinner />
  )
  if (props.ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchase(props.ings)}
          ordered={purchaseHandler}
          price={props.price}
          isAuth={props.isAuthenticated}
        />
      </React.Fragment>
    )
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    )
  }

  return (
    <React.Fragment>
      <Modal show={purchasingState} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
