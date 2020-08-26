import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxilary/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		axios.get('https://react-burger-builder-dd799.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data })
			})
			.catch(error => { this.setState({ error: true }) });
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
		// alert('You continue');
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Upinder Singh',
				address: {
					street: 'Street one',
					zipCode: '3945',
					country: 'india'
				},
				email: 'xyz@example.com'
			},
			deliveryMethod: 'fastest'
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false, purchasing: false });
			})
			.catch(error => {
				this.setState({ loading: false, purchasing: false });
			});
	}

	render() {
		const disabbledInfo = { ...this.state.ingredients };
		for (let type in disabbledInfo)
			disabbledInfo[type] = this.state.ingredients[type] <= 0;

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner></Spinner>;

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}></Burger>
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabbledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					></BuildControls>
				</Aux>
			);
			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				price={this.state.totalPrice}
			></OrderSummary>
		}
		if (this.state.loading) {
			orderSummary = <Spinner></Spinner>
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux >
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);