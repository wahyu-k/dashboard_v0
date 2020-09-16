const register = require('./register')
const login = require('./login')
const forgetPass = require('./forgetPass')
const resetPass = require('./resetPass')

const loginApi = {
  register,
  login,
  forgetPass,
  resetPass,
}

module.exports = loginApi
