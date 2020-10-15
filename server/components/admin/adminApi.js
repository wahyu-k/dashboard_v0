const getDevices = require('./getDevices')
const addDevice = require('./addDevice')
const getSensors = require('./getSensors')
const getUsers = require('./getUsers')
const updateDevice = require('./updateDevice')
const binds = require('./binds')

const adminApi = {
  getDevices,
  addDevice,
  getSensors,
  getUsers,
  updateDevice,
  binds,
}

module.exports = adminApi
