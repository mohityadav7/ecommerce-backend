/**
 * Validate user input for updating user info. Send status 400 if data is invalid.
 * Update user info using user service if input is valid.
 */

const constants = require('../../constants');
const userService = require('../../services/user.service');

module.exports = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ msg: 'Id not present in request' });
        return;
    }

    const { name, email, phone } = req.body;
    const id = req.params.id;
    const reEmail = constants.regex.REGEX_EMAIL_VALIDATION;
    const rePhone = constants.regex.REGEX_PHONE_VALIDATIOIN;
    let validationResult = { isValid: true, validationError: '' };

    // validate name
    if (name && name.length < 3) {
        validationResult.isValid = false;
        validationResult.validationError = 'Name is too short';
    }

    // validate email
    else if (email && !reEmail.test(email)) {
        validationResult.isValid = false;
        validationResult.validationError = 'Invalid email address';
    }

    // validate phone number
    else if (phone && !rePhone.test(phone)) {
        validationResult.isValid = false;
        validationResult.validationError = 'Invalid phone number';
    }

    if (!validationResult.isValid) {
        res.status(400).json({ msg: validationResult.validationError });
    } else {
        const userData = {};
        if (name) userData.name = name;
        if (email) userData.email = email;
        if (phone) userData.phone = phone;

        const response = await userService.updateUserById(id, userData);
        console.log('updateUserById:: response:', response);

        if (response.errors) {
            const errorField = Object.keys(response.errors)[0];
            res.status(400).send({
                msg: `User already exists with ${errorField} ${response.errors[errorField].value}`,
            });
        } else if (!response.user) {
            res.status(200).json({ msg: `No user with id ${id}` });
        } else {
            res.status(200).json(response.user);
        }
    }
};
