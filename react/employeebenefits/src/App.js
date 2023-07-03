import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
	Navbar,
	Home,
	EmployeeView,
	Unauthorized,
	EmployeeUpdate,
	Dashboard,
} from './admin';
import './App.css';

function App() {
	// Need to implement authentication
	// Also get user from DB
	const [user] = useState({
		roles: ['admin'],
	});

	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/home'
					element={<Home />}
				/>
				<Route
					path='/viewemployees'
					element={
						// Fix later
						user.roles[0] === 'admin' ? (
							<EmployeeView />
						) : (
							<Unauthorized />
						)
					}
				/>
				<Route
					path='/admindash'
					element={
						// Fix later
						user.roles[0] === 'admin' ? (
							<Dashboard />
						) : (
							<Unauthorized />
						)
					}
				/>
				<Route
					path='/admin/employee/update/:employeeId'
					element={
						// Fix later
						user.roles[0] === 'admin' ? (
							<EmployeeUpdate />
						) : (
							<Unauthorized />
						)
					}
				/>
				<Route
					path='/unauthorized'
					component={Unauthorized}
				/>
			</Routes>
		</div>
	);
}

export default App;
