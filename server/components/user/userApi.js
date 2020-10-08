const getPersonalData = require('./getPersonalData')
const updatePersData = require('./updatePersData')
const getSensors = require('./getSensors')

const userApi = {
  getPersonalData,
  updatePersData,
  getSensors,
}

module.exports = userApi
