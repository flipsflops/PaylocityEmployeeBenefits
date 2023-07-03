import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';

import styles from './Dashboard.module.css';

const Dashboard = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
		employee: '',
	});

	const options = [
		{ value: '1', label: 'John Smith' },
		{ value: '2', label: 'Karie Care' },
		{ value: '3', label: 'Martin Lothar' },
	];

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleEmployeeSelect = (selectedEmployee) => {
		setFormData({
			...formData,
			employee: selectedEmployee,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<>
			<Form
				className={styles.container}
				onSubmit={handleSubmit}>
				<FormGroup>
					<Label for='employee'>Employees:</Label>
					<Select
						name='employee'
						value={formData.selectedEmployee}
						onChange={handleEmployeeSelect}
						options={options}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='email'>Email:</Label>
					<Input
						type='email'
						name='email'
						id='email'
						value={formData.email}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='message'>Message:</Label>
					<Input
						type='textarea'
						name='message'
						id='message'
						value={formData.message}
						onChange={handleChange}
					/>
				</FormGroup>
				<Button
					type='submit'
					color='primary'>
					Submit
				</Button>
			</Form>
		</>
	);
};

export default Dashboard;
