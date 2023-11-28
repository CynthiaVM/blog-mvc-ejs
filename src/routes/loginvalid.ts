import { body } from 'express-validator';

export const loginValidator = [
	body('email', 'Invalid does not Empty').not().isEmpty(),
	body('email', 'Invalid email').isEmail(),
	body('pass', 'The minimum password length is 6 characters').isLength({
		min: 6,
	}),
];
