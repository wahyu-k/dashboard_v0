const calcPost = require('./calcPost')
const calcGet = require('./calcGet')
const calcPut = require('./calcPut')
const calcDash = require('./calcDash')
const calcDashrec = require('./calcDashrec')
const filter = require('./filter')

const calcApi = {
  calcPost,
  calcGet,
  calcPut,
  calcDash,
  calcDashrec,
  filter,
}

module.exports = calcApi
