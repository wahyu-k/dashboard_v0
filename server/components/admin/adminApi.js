const getDevices = require('./getDevices')
const addDevice = require('./addDevice')
const getSensors = require('./getSensors')
const getUsers = require('./getUsers')
const updateDevice = require('./updateDevice')
const binds = require('./binds')
const getBinds = require('./getBinds')
const updateBinds = require('./updateBinds')
const deleteBinds = require('./deleteBinds')

const adminApi = {
  getDevices,
  addDevice,
  getSensors,
  getUsers,
  updateDevice,
  binds,
  getBinds,
  updateBinds,
  deleteBinds,
}

module.exports = adminApi
