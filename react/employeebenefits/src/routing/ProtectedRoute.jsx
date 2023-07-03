import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({
	component: Component,
	allowedRoles,
	userRole,
	...rest
}) => {
	// const navigate = useNavigate();
	const isAuthorized = allowedRoles.includes(userRole);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthorized ? (
					<Component {...props} />
				) : (
					{ redirectToUnauthorizedPage }
				)
			}
		/>
	);
};

export default ProtectedRoute;
