import React from 'react';
import BurgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.css';


const logo = (props) => {
	return (
		<div className={classes.Logo} style={{ height:props.height}}>
			<img src={BurgerLogo} alt="MyBurger"></img>
		</div>
	)
}

export default logo;