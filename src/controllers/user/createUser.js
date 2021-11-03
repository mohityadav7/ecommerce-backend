const userService = require('../../services/user.service');
const constants = require('../../constants');
const errors = require('../../errors');

/**
 * Validate user input for sign up. Send status 400 if input is not valid.
 * Create user using user service if input is valid.
 */
module.exports = async (req, res, next) => {
    const { name, email, phone, pwd, pwd_confirm: pwdConfirm } = req.body;
    const reEmail = constants.regex.REGEX_EMAIL_VALIDATION;
    const rePhone = constants.regex.REGEX_PHONE_VALIDATIOIN;
    let validationResult = { isValid: true, validationError: '' };

    // validate name
    if (!name || name.length < 3) {
        validationResult.isValid = false;
        validationResult.validationError = 'Name is too short';
    }

    // validate email
    else if (!reEmail.test(email)) {
        validationResult.isValid = false;
        validationResult.validationError = 'Invalid email address';
    }

    // validate phone number
    else if (!rePhone.test(phone)) {
        validationResult.isValid = false;
        validationResult.validationError = 'Invalid phone number';
    }

    // validate password
    else if (!pwd || pwd.length < 5) {
        validationResult.isValid = false;
        validationResult.validationError = 'Password too short';
    }

    // validate password confirmation
    else if (pwdConfirm !== pwd) {
        validationResult.isValid = false;
        validationResult.validationError = 'Passwords do not match';
    }

    if (!validationResult.isValid) {
        // validation passed
        next(new errors.BadRequestError(validationResult.validationError));
    } else {
        // validation failed
        const response = await userService.createUser(req.body);
        if (response.errors) {
            // user already exists
            const errorField = Object.keys(response.errors)[0];
            next(
                new errors.BadRequestError(
                    `User already exists with ${errorField} ${response.errors[errorField].value}`
                )
            );
        } else {
            // user created
            const returnData = {
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
            };
            res.status(200).json(returnData);
        }
    }
};
