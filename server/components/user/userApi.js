const getPersonalData = require('./getPersonalData')
const updatePersData = require('./updatePersData')
const getSensors = require('./getSensors')
const getBinds = require('./getBinds')
const getBindSensor = require('./getBindSensor')

const userApi = {
  getPersonalData,
  updatePersData,
  getSensors,
  getBinds,
  getBindSensor,
}

module.exports = userApi
