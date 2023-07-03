import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Menu, Item, Separator, useContextMenu } from 'react-contexify';
import { useNavigate } from 'react-router-dom';
import 'react-contexify/ReactContexify.css';
import styles from './EmployeeCard.module.css';

const EmployeeCard = ({ employee }) => {
	console.log('EmployeeCard employee', employee);
	const navigate = useNavigate();
	const { show } = useContextMenu({
		id: employee.id,
	});

	function handleContextMenu(event) {
		show({
			event,
			props: {
				key: 'value',
			},
		});
	}
	// simplify later
	const employeeDependents =
		employee?.dependents?.length > 0
			? employee.dependents.map((dependent) => {
					return (
						<>
							<p>Name: {dependent.name}</p>
							<p>
								Relationship: {''}
								{dependent.relationshipType}
							</p>
						</>
					);
			  })
			: 'No dependents';

	const handleItemClick = ({ id, event, props }) => {
		console.log('handleItemClicked employee', employee);

		switch (id) {
			case 'viewmore':
				console.log('View More clicked');
				break;
			case 'update':
				navigate(`/admin/employee/update/${employee.id}`, {
					state: { ...employee },
				});
				break;
			default:
				console.log('Failed to capture any menu event', event, props);
		}
	};

	return (
		<Card
			className={styles['card']}
			onContextMenu={handleContextMenu}
			style={{ maxWidth: '34vw' }}>
			<Menu id={employee.id}>
				<Item
					id='viewmore'
					onClick={handleItemClick}>
					View More
				</Item>
				<Separator />
				<Item
					id='update'
					onClick={handleItemClick}>
					Update
				</Item>
			</Menu>
			<CardBody>
				<CardTitle className={styles['card-title']}>
					{employee.name}
				</CardTitle>
				<CardText>Employee Id: {employee.id}</CardText>
				<CardText>Deparment: {employee.departmentName}</CardText>
				<CardText>Employee DOB: {employee.dob}</CardText>
				<CardText>Employee Dependents: {employeeDependents}</CardText>
			</CardBody>
		</Card>
	);
};

export default EmployeeCard;
