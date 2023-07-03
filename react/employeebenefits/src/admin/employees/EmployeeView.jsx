import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

import styles from './EmployeeView.module.css';
import EmployeeCard from './EmployeeCard';

import { getAllEmployees } from '../../services/employees/adminEmployeeService';

const options = [
	{ value: '1', label: 'Finance' },
	{ value: '2', label: 'Marketing' },
	{ value: '3', label: 'UX' },
	{ value: '4', label: 'Engineering' },
];

// const employeesConst = [
// 	{
// 		employeeId: 1,
// 		name: 'John Doe',
// 		dob: '1980-01-01',
// 		dependents: [
// 			{
// 				id: 1,
// 				name: 'Jane Doe',
// 				relationship: 'Spouse',
// 				isCovered: true,
// 			},
// 			{
// 				id: 2,
// 				name: 'Emily Doe',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 			{
// 				id: 3,
// 				name: 'Michael Doe',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 		],
// 		department: {
// 			id: 1,
// 			name: 'Finance',
// 		},
// 	},
// 	{
// 		employeeId: 2,
// 		name: 'Alice Smith',
// 		dob: '1985-05-10',
// 		dependents: [
// 			{
// 				id: 1,
// 				name: 'Aliver Smith',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 			{
// 				id: 2,
// 				name: 'Sophia Smith',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 		],
// 		department: {
// 			id: 2,
// 			name: 'Marketing',
// 		},
// 	},
// 	{
// 		employeeId: 3,
// 		name: 'Robert Johnson',
// 		dob: '1976-09-15',
// 		dependents: [],
// 		department: {
// 			id: 3,
// 			name: 'UX',
// 		},
// 	},
// 	{
// 		employeeId: 4,
// 		name: 'Emily Davis',
// 		dob: '1990-03-22',
// 		dependents: [
// 			{
// 				id: 1,
// 				name: 'Liam Davis',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 			{
// 				id: 2,
// 				name: 'Ava Davis',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 			{
// 				id: 3,
// 				name: 'Jacob Davis',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 		],
// 		department: {
// 			id: 4,
// 			name: 'Engineering',
// 		},
// 	},
// 	{
// 		employeeId: 5,
// 		name: 'Michael Wilson',
// 		dob: '1982-07-18',
// 		dependents: [
// 			{
// 				id: 1,
// 				name: 'Harper Wilson',
// 				relationship: 'Child',
// 				isCovered: false,
// 			},
// 		],
// 		department: {
// 			id: 4,
// 			name: 'Engineering',
// 		},
// 	},
// 	{
// 		employeeId: 6,
// 		name: 'Emma Thompson',
// 		dob: '1978-12-03',
// 		dependents: [
// 			{
// 				id: 1,
// 				name: 'Benjamin Thompson',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 			{
// 				id: 2,
// 				name: 'Abigail Thompson',
// 				relationship: 'Child',
// 				isCovered: true,
// 			},
// 		],
// 		department: {
// 			id: 2,
// 			name: 'Marketing',
// 		},
// 	},
// 	// {
// 	// 	employeeId: 7,
// 	// 	name: 'William Rodriguez',
// 	// 	dob: '1987-04-29',
// 	// 	dependents: [
// 	// 		{ id: 1, name: 'Isabella Rodriguez', relationship: 'Child' },
// 	// 	],
// 	// },
// 	// {
// 	// 	employeeId: 8,
// 	// 	name: 'Olivia Martinez',
// 	// 	dob: '1992-08-11',
// 	// 	dependents: [
// 	// 		{ id: 1, name: 'Daniel Martinez', relationship: 'Child' },
// 	// 		{ id: 2, name: 'Sophie Martinez', relationship: 'Child' },
// 	// 	],
// 	// },
// 	// {
// 	// 	employeeId: 9,
// 	// 	name: 'James Anderson',
// 	// 	dob: '1984-06-05',
// 	// 	dependents: [
// 	// 		{ id: 1, name: 'Evelyn Anderson', relationship: 'Spouse' },
// 	// 		{ id: 2, name: 'Alexander Anderson', relationship: 'Child' },
// 	// 		{ id: 3, name: 'Grace Anderson', relationship: 'Child' },
// 	// 		{ id: 4, name: 'Samuel Anderson', relationship: 'Child' },
// 	// 	],
// 	// },
// 	// {
// 	// 	employeeId: 10,
// 	// 	name: 'Sophia Clark',
// 	// 	dob: '1995-11-24',
// 	// 	dependents: [
// 	// 		{ id: 1, name: 'Mia Clark', relationship: 'Child' },
// 	// 		{ id: 2, name: 'Lucas Clark', relationship: 'Child' },
// 	// 		{ id: 3, name: 'Lily Clark', relationship: 'Child' },
// 	// 	],
// 	// },
// 	// {
// 	// 	employeeId: 11,
// 	// 	name: 'Logan Walker',
// 	// 	dob: '1983-02-14',
// 	// 	dependents: [{ id: 1, name: 'Matthew Walker', relationship: 'Child' }],
// 	// },
// 	// {
// 	// 	employeeId: 12,
// 	// 	name: 'Chloe Turner',
// 	// 	dob: '1991-09-08',
// 	// 	dependents: [
// 	// 		{ id: 1, name: 'Victoria Turner', relationship: 'Child' },
// 	// 		{ id: 2, name: 'Henry Turner', relationship: 'Child' },
// 	// 		{ id: 3, name: 'Scarlett Turner', relationship: 'Child' },
// 	// 	],
// 	// },
// 	// {
// 	// 	employeeId: 13,
// 	// 	name: 'Daniel Lee',
// 	// 	dob: '1979-12-20',
// 	// 	dependents: [
// 	// 		{ id: 1, name: 'Andrew Lee', relationship: 'Child' },
// 	// 		{ id: 2, name: 'Natalie Lee', relationship: 'Child' },
// 	// 	],
// 	// },
// 	// {
// 	// 	employeeId: 14,
// 	// 	name: 'Mia Baker',
// 	// 	dob: '1986-03-17',
// 	// 	dependents: [
// 	// 		{ id: 1, name: 'Christopher Baker', relationship: 'Child' },
// 	// 		{ id: 2, name: 'Sarah Baker', relationship: 'Child' },
// 	// 		{ id: 3, name: 'Jackson Baker', relationship: 'Child' },
// 	// 	],
// 	// },
// ];

const EmployeeView = () => {
	const [selectedDepartment, setSelectedDepartment] = useState(null);
	const [employees, setEmployees] = useState(null);

	const handleGetAllEmployeesSuccess = (resp) => {
		const { data } = resp;
		const { items } = data;

		if (items) {
			setEmployees(items);
		} else {
			console.log('no employees');
			// toastr
		}
	};

	const handleGetAllEmployeesErr = (err) => {
		console.log('handleGetAllEmployeesErr err', err);
		// add toastr
	};

	useEffect(() => {
		getAllEmployees()
			.then(handleGetAllEmployeesSuccess)
			.catch(handleGetAllEmployeesErr);
	}, []);

	const handleDepartmentChange = (selectedOption) => {
		setSelectedDepartment(selectedOption);
	};

	const renderEmployeeCards = () => {
		if (!employees || employees.length === 0) {
			return (
				<Row>
					<span
						style={{
							fontSize: '1rem',
							fontWeight: 'bold',
							textAlign: 'center',
						}}>
						No employees found
					</span>
				</Row>
			);
		}

		return employees.map((employee) => (
			<EmployeeCard
				key={employee.id}
				employee={employee}
			/>
		));
	};

	return (
		<Container>
			<Row>
				<Col xs='3'>
					<div className='header'>
						<Select
							value={selectedDepartment}
							onChange={handleDepartmentChange}
							options={options}
							placeholder='Select Department'
						/>
					</div>
				</Col>
				<Col xs='6'>
					<div className={styles['employee-view-title']}>
						<h1>Employees</h1>
					</div>
				</Col>
			</Row>
			<Row className={styles['employee-card-container']}>
				{renderEmployeeCards()}
			</Row>
		</Container>
	);
};

export default EmployeeView;
