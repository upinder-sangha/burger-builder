import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	}

	updatePurchaseState(ingredients) {
		let purchasable = false;
		for (let type in ingredients)
			if (ingredients[type])			//checks if atleast one ingredient is present
				purchasable = true;
		this.setState({ purchasable: purchasable });
	}

	addIngredientHandler = (type) => {
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = this.state.ingredients[type] + 1;
		const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {

		if (!this.state.ingredients[type]) {
			return;
		}

		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = this.state.ingredients[type] - 1;
		const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice
		});
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}
	purchaseContinueHandler = () => {
		alert('You continue');
	}

	render() {
		const disabbledInfo = { ...this.state.ingredients };
		for (let type in disabbledInfo)
			disabbledInfo[type] = this.state.ingredients[type] <= 0;

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					></OrderSummary>
				</Modal>
				<Burger ingredients={this.state.ingredients}></Burger>
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabbledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				></BuildControls>
			</Aux >
		);
	}
}

export default BurgerBuilder;