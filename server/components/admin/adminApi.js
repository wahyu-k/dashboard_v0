const getDevices = require('./getDevices')
const addDevice = require('./addDevice')
const getSensors = require('./getSensors')
const getUsers = require('./getUsers')
const updateDevice = require('./updateDevice')

const adminApi = {
  getDevices,
  addDevice,
  getSensors,
  getUsers,
  updateDevice,
}

module.exports = adminApi
