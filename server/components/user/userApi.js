const getPersonalData = require('./getPersonalData')
const updatePersData = require('./updatePersData')
const getSensors = require('./getSensors')
const getBinds = require('./getBinds')
const getBindSensor = require('./getBindSensor')
const getLandingPage = require('./getLandingPage')

const userApi = {
  getPersonalData,
  updatePersData,
  getSensors,
  getBinds,
  getBindSensor,
  getLandingPage,
}

module.exports = userApi
