import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from './constants';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg bg-light justify-content-end mb-5'>
			<div>
				<ul className='navbar-nav'>
					{navLinks.map((nav) => (
						<Link
							className='p-3'
							to={`/${nav.id}`}
							key={nav.id}>
							{nav.title}
						</Link>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
