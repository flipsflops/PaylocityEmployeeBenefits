/*
	* IMPORTANT *
	1. These values should ALL be coming from the DB
	2. These values should NOT be hard-coded in the front-end
	Q's
	1. Where should this data be stored ?
		- Component
		- Redux
		- Context
*/
const EMPLOYEE_BENEFITS_COST = 1000;
const DEPENDENTS_BENEFITS_COST = 500;
const LETTER_FOR_DISCOUNT = 'a';
const DISCOUNT_PERCENTAGE = 0.1;

const stringStartsWithLetter = (string) => {
	string = string.toLowerCase();

	return string[0] === LETTER_FOR_DISCOUNT;
};

export const calculateEmployeeBenefitsCost = (employeeName, dependents) => {
	let total = 0;
	let employeeCost = 0;

	if (stringStartsWithLetter(employeeName)) {
		employeeCost = EMPLOYEE_BENEFITS_COST * (1 - DISCOUNT_PERCENTAGE);
	} else {
		employeeCost = EMPLOYEE_BENEFITS_COST;
	}

	dependents.forEach((dependent) => {
		if (stringStartsWithLetter(dependent.name) && dependent.isCovered) {
			total += DEPENDENTS_BENEFITS_COST * (1 - DISCOUNT_PERCENTAGE);
		} else {
			if (dependent.isCovered) {
				total += DEPENDENTS_BENEFITS_COST;
			}
		}
	});

	return (total += employeeCost);
};
