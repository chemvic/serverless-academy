
const ctrlWrapper = require('../../helpers/ctrlWrapper');
// const login = require('./login');
const register = require('./register');

module.exports = {
    register: ctrlWrapper(register),
    // login: ctrlWrapper(login),
}