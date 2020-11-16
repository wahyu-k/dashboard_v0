const getPersonalData = require('./getPersonalData')
const updatePersData = require('./updatePersData')
const getSensors = require('./getSensors')
const getBinds = require('./getBinds')
const getBindSensor = require('./getBindSensor')
const getLandingPage = require('./getLandingPage')
const keluhan = require('./keluhan')

const userApi = {
  getPersonalData,
  updatePersData,
  getSensors,
  getBinds,
  getBindSensor,
  getLandingPage,
  keluhan,
}

module.exports = userApi
