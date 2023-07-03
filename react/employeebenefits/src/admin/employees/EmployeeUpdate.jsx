import React, { useState, useEffect, useCallback } from 'react';
import {
	Form,
	Button,
	Container,
	Row,
	Col,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { useLocation } from 'react-router-dom';
import styles from './EmployeeUpdate.module.css';

import EmployeeAddDependentModal from './EmployeeAddDependentModal';
import EmployeeDependentCard from './EmployeeDependentCard';
import { calculateEmployeeBenefitsCost } from '../common-util';

const EmployeeUpdate = () => {
	const { state } = useLocation();
	const [formData, setFormData] = useState({
		departmentName: '',
		dependents: [],
		dob: new Date(),
		name: '',
		id: 0,
		costOfBenefitsPerYear: 0,
		costOfBenefitsPerMonth: 0,
	});
	const [currentDependentsMapped, setCurrentDependentsMapped] = useState([]);
	const [showAddDependentModal, setShowAddDependentModal] = useState(false);
	const [isAddClicked, setIsAddClicked] = useState(false);
	const [dependentToUpdate, setDependentToUpdate] = useState({});

	// #region Event handlers
	const handleFormFieldChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// create API call here
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('formData', formData);
	};

	const handleToggleModal = (e) => {
		e.preventDefault();
		setShowAddDependentModal(!showAddDependentModal);
		setIsAddClicked(true);
		setDependentToUpdate({});
	};

	const handleUpdateClicked = (e, dependentToUpdate) => {
		e.preventDefault();
		setIsAddClicked(false);
		setShowAddDependentModal(true);
		setDependentToUpdate(dependentToUpdate);
	};

	const handleDeleteClicked = useCallback((e, dependentToUpdate) => {
		e.preventDefault();

		setFormData((prevState) => {
			const updatedState = { ...prevState };

			const dependentIdx = updatedState.dependents.findIndex(
				(dependent) => dependent.id === dependentToUpdate.id,
			);

			if (dependentIdx >= 0) {
				updatedState.dependents.splice(dependentIdx, 1);
			}

			return updatedState;
		});
	}, []);
	//#endregion

	// #region Util
	const mapEmployeeDependents = useCallback(
		(dependent) => {
			return (
				<EmployeeDependentCard
					key={`dependent-card-${dependent.id}`}
					dependentData={dependent}
					employeeId={formData.id}
					handleUpdateClicked={handleUpdateClicked}
					handleDeleteClicked={handleDeleteClicked}
				/>
			);
		},
		[handleDeleteClicked, formData.id],
	);
	// #endregion

	// #region useEffects
	useEffect(() => {
		const updatedDependents = formData.dependents.map(
			mapEmployeeDependents,
		);
		setCurrentDependentsMapped(updatedDependents);
	}, [formData, mapEmployeeDependents]);

	useEffect(() => {
		if (state) {
			const { name, dependents } = state;

			const costOfBenefitsPerYear = calculateEmployeeBenefitsCost(
				name,
				dependents,
			);
			const costOfBenefitsPerMonth =
				Math.round((costOfBenefitsPerYear / 12) * 100) / 100;
			const mappedDependents = dependents.map(mapEmployeeDependents);

			setCurrentDependentsMapped(mappedDependents);
			setFormData({
				...state,
				// I'd create a helper fnc for dates and use it here
				dob: new Date(state.dob).toISOString().split('T')[0],
				costOfBenefitsPerYear: costOfBenefitsPerYear,
				costOfBenefitsPerMonth: costOfBenefitsPerMonth,
			});
		}
	}, [state, mapEmployeeDependents]);
	// #endregion

	return (
		<>
			<Form onSubmit={handleSubmit}>
				{state && (
					<EmployeeAddDependentModal
						isModalOpen={showAddDependentModal}
						handleToggleModal={handleToggleModal}
						employeeData={{ ...formData }}
						setEmployeeData={setFormData}
						currentDependentsMapped={currentDependentsMapped}
						setCurrentDependentsMapped={setCurrentDependentsMapped}
						mapEmployeeDependents={mapEmployeeDependents}
						isAddClicked={isAddClicked}
						dependentToUpdate={dependentToUpdate}
					/>
				)}
				<Container>
					<Row>
						<Col>
							<FormGroup>
								<Label for='name'>Name</Label>
								<Input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleFormFieldChange}
								/>
							</FormGroup>
						</Col>
						<Col xs='6'>
							<FormGroup>
								<Label for='departmentName'>Department</Label>
								<Input
									type='text'
									name='departmentName'
									value={formData.departmentName}
									onChange={handleFormFieldChange}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col xs='6'>
							<FormGroup>
								<Label for='dob'>Date of Birth</Label>
								<Input
									type='date'
									name='dob'
									value={formData.dob}
									onChange={handleFormFieldChange}
								/>
							</FormGroup>
						</Col>
						<Col xs='6'>
							<FormGroup>
								<Label for='id'>Employee ID</Label>
								<Input
									disabled={true}
									type='text'
									name='id'
									readOnly
									value={formData.id}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormGroup>
								<Label for='costOfBenefitsPerYear'>
									Current Employee Benefits Cost per Year
								</Label>
								<Input
									disabled={true}
									type='text'
									name='costOfBenefitsPerYear'
									readOnly
									value={formData.costOfBenefitsPerYear}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormGroup>
								<Label for='costOfBenefitsPerMonth'>
									Current Employee Benefits Cost per Month
								</Label>
								<Input
									disabled={true}
									type='text'
									name='costOfBenefitsPerMonth'
									readOnly
									value={formData.costOfBenefitsPerMonth}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col className={styles['checkbox-container']}>
							<Label
								className={styles['checkbox-container-title']}
								for='dependents'>
								<button>Undo</button> Current Dependents{' '}
								<button onClick={handleToggleModal}>Add</button>
							</Label>
							{currentDependentsMapped &&
							currentDependentsMapped.length > 0
								? currentDependentsMapped
								: 'No Dependents'}
						</Col>
					</Row>
				</Container>
				<Button
					type='submit'
					color='primary'>
					Update
				</Button>
			</Form>
		</>
	);
};

export default EmployeeUpdate;
