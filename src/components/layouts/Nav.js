import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LoginContext } from '../../contexts/LoginContext';

function NavBar(props) {
	return (
		<BrowserRouter basename={props.basename} forceRefresh={props.refresh}>
			<nav className='navbar navbar-expand-lg w-100 container'>
				<div>
					<img className='img-logo' src='/assets/img/svg/logo.svg' />
					<a className='pl-3 navbar-brand' href='/'>
						Cronose
					</a>
				</div>

				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarToggler'
					aria-controls='navbarToggler'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'>
						<GiHamburgerMenu />
					</span>
				</button>
				<div
					className='h-nav collapse navbar-collapse text-left mr-4 mt-2'
					id='navbarToggler'>
					<ul id='ul-nav-hor' className='navbar-nav'>
						{props.routes.map(function(route, index) {
							if (route.show == false) return;
							return (
								<li key={index} className='item'>
									<NavLink
										to={route.path}
										exact={route.exact}
										className='nav-item mr-2 px-3 py-2'
										activeClassName='active'>
										{route.title}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
			<main className='w-100'>{SwitchRoutes(props.routes)}</main>
		</BrowserRouter>
	);
}

function SideBar(props) {
	return (
		<BrowserRouter basename={props.basename} forceRefresh={props.refresh}>
			<input type='checkbox' name='toggle' id='sidebar-toggle'></input>
			<nav className='sidebar-nav'>
				<section className='navbar'>
					<label htmlFor='sidebar-toggle' className='menu-icon'>
						<i className='hamburger'></i>
					</label>
					<img
						className='img-logo m-auto mt-4'
						src='/assets/img/svg/logo.svg'
					/>
					<ul className='nav flex-column mb-0 mt-4'>
						{props.routes.map(function(route, index) {
							if (route.show == false) return;
							return (
								<li key={index} className='nav-item'>
									<NavLink
										to={route.path}
										exact={route.exact}
										className=''
										activeClassName='active'>
										<i className='icon'>{route.icon ? <route.icon /> : null}</i>
										<p>{route.title}</p>
									</NavLink>
								</li>
							);
						})}
						<LoginContext.Consumer>
							{(context) => (
								<i
									id='iconDown'
									className='mt-5'
									onClick={() => context.logout()}>
									<FaPowerOff />
								</i>
							)}
						</LoginContext.Consumer>
					</ul>
				</section>
			</nav>
			<main>{SwitchRoutes(props.routes)}</main>
		</BrowserRouter>
	);
}

function SwitchRoutes(routes) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route
					key={index}
					path={route.path}
					exact={route.exact}
					component={route.component}
				/>
			))}
		</Switch>
	);
}

export { NavBar, SideBar };
