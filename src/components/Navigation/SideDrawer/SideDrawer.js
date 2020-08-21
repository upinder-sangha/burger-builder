import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/auxilary';

const sideDrawer = (props) => {
	let attatchedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attatchedClasses = [classes.SideDrawer, classes.Open]
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed}></Backdrop>
			<div className={attatchedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo></Logo>
				</div>
				<nav>
					<NavigationItems></NavigationItems>
				</nav>
			</div>
		</Aux>
	)
}

export default sideDrawer;