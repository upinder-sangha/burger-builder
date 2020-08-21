import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

	let transforedingredients =
		Object.keys(props.ingredients).map(igkey => {													//makes an array of keys of ingredients object
			return [...Array(props.ingredients[igkey])].map((_, i) => {									//creates an array of length(equal to value of ingredient) for each ingredient
				return <BurgerIngredient key={igkey + i} type={igkey}></BurgerIngredient>			//maps each element to return a burger ingredient component
			});
		});

	transforedingredients= transforedingredients.flat();											//flatens the array
	if (!transforedingredients.length) {
		transforedingredients=<p>Please start adding ingredients!</p>
	}
	
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"></BurgerIngredient>
			{transforedingredients}
			<BurgerIngredient type="bread-bottom"></BurgerIngredient>
		</div>
	);
};

export default burger;