import React from 'react';
import { Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
// import styles from './EmployeeDependentCard.module.css';

const EmployeeDependentCard = ({
	dependentData,
	employeeId,
	handleUpdateClicked,
	handleDeleteClicked,
}) => {
	return (
		<Card>
			<CardBody>
				<CardTitle>{dependentData.name}</CardTitle>
				<CardText>Employee Id: {employeeId}</CardText>
				<CardText>
					IsCovered:{' '}
					{typeof dependentData.isCovered === 'boolean'
						? dependentData.isCovered.toString()
						: dependentData.isCovered}
				</CardText>
				<Button
					className='ml-auto'
					color='primary'
					onClick={(e) => handleUpdateClicked(e, dependentData)}>
					Update
				</Button>
				<Button
					className='ml-auto'
					color='danger'
					onClick={(e) => handleDeleteClicked(e, dependentData)}>
					{' '}
					Delete
				</Button>
			</CardBody>
		</Card>
	);
};

export default EmployeeDependentCard;
