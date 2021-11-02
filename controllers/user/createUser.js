const userService = require('../../services/user.service');
const constants = require('../../constants');

/**
 * Validate user input for sign up. Send status 400 if input is not valid.
 * Create user using user service if input is valid.
 */
module.exports = async (req, res) => {
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
        res.status(400).json({ msg: validationResult.validationError });
    } else {
        const response = await userService.createUser(req.body);
        if (response.errors) {
            const errorField = Object.keys(response.errors)[0];
            res.status(400).send({
                msg: `User already exists with ${errorField} ${response.errors[errorField].value}`,
            });
        } else if (response.user) {
            const returnData = {
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
            };
            res.status(200).json(returnData);
        } else {
            res.status(500).json(response);
        }
    }
};
