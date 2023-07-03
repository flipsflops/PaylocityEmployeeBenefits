import React, { useState, useEffect } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	Form,
	Container,
	Row,
	Col,
	FormGroup,
	Label,
	Input,
	ModalHeader,
} from 'reactstrap';
const EmployeeAddDependentModal = ({
	isModalOpen,
	handleToggleModal,
	employeeData,
	setEmployeeData,
	setCurrentDependentsMapped,
	mapEmployeeDependents,
	isAddClicked,
	dependentToUpdate,
}) => {
	const [formData, setFormData] = useState({
		employeeId: 0,
		dob: '',
		name: '',
		dependent: {
			id: 0,
			name: '',
			isCovered: false,
			relationship: '',
		},
		department: {
			id: 0,
			name: '',
		},
		costOfBenefits: 0,
		dependents: [],
	});
	const [isAddingEmployee, setIsAddingEmployee] = useState(false);

	useEffect(() => {
		if (employeeData) {
			setFormData((prevState) => {
				const res = {
					...prevState,
					...employeeData,
				};

				return res;
			});
			setIsAddingEmployee(isAddClicked);
		} else if (dependentToUpdate && !isAddClicked) {
			setFormData((prevState) => {
				const res = {
					...prevState,
					dependent: { ...dependentToUpdate },
				};

				return res;
			});
		}
	}, [employeeData, dependentToUpdate, isAddClicked]);

	const handleFormFieldChange = (e) => {
		if (e.target.name === 'isCovered' || e.target.name === 'name') {
			let value = e.target.value;

			if (value === 'on') {
				value = !formData.dependent.isCovered;
			}

			setFormData({
				...formData,
				dependent: {
					...formData.dependent,
					[e.target.name]: value,
				},
			});
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		}
	};

	// create API call here
	const handleSubmit = (e) => {
		e.preventDefault();

		if (isAddingEmployee) {
			// API call
			// onSuccess then update dependent
			// don't forget to close modal AND reset modal state
			// else spit out error
			const currentDependents = [
				...formData.dependents,
				{
					id: Math.random(),
					name: formData.dependent.name,
					isCovered: formData.dependent.isCovered,
				},
			];

			const mappedDependents = currentDependents.map(
				mapEmployeeDependents,
			);

			setEmployeeData({ ...formData, dependents: currentDependents });
			setCurrentDependentsMapped(mappedDependents);
		} else {
			// API call
			// Onsuccess update
		}
	};

	// const handleUpdateDependentSuccess = (payload) => {

	// };

	return (
		<div>
			<Modal
				isOpen={isModalOpen}
				toggle={handleToggleModal}>
				<ModalHeader className='d-flex justify-content-end'>
					<Button
						className='ml-auto'
						color='danger'
						onClick={handleToggleModal}>
						X
					</Button>
				</ModalHeader>
				<ModalBody>
					<h3 className='text-center'>
						Employee {employeeData.name}
					</h3>
					<Form onSubmit={handleSubmit}>
						<Container>
							<Row>
								<Col>
									<FormGroup>
										<Label for='name'>Dependent Name</Label>
										<Input
											type='text'
											name='name'
											value={formData.dependent.name}
											onChange={handleFormFieldChange}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col xs='6'>
									<FormGroup>
										<Label for='employeeId'>
											Employee ID
										</Label>
										<Input
											disabled={true}
											type='text'
											name='employeeId'
											readOnly
											value={formData.employeeId}
										/>
									</FormGroup>
								</Col>
								<Col xs='6'>
									<FormGroup>
										<Label for='costOfBenefits'>
											Current Cost
										</Label>
										<Input
											disabled={true}
											type='text'
											name='costOfBenefits'
											readOnly
											value={formData.costOfBenefits}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Col>
								<FormGroup>
									<Label
										for='isCovered'
										style={{
											marginRight: '10px',
										}}>
										Provide Coverage
									</Label>
									<Label check>
										<Input
											type='checkbox'
											name='isCovered'
											checked={
												formData.dependent.isCovered
											}
											onChange={handleFormFieldChange}
										/>
									</Label>
								</FormGroup>
							</Col>
						</Container>
						<div>
							<Button
								type='submit'
								color={isAddingEmployee ? 'primary' : 'info'}
								className='mt-4 d-block mx-auto'>
								{isAddingEmployee ? 'Add' : 'Update'}
							</Button>
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default EmployeeAddDependentModal;
