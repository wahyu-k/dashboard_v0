﻿require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())

const tokenValidator = require('./components/helper/tokenValidation')

app.get('/', (req, res) => {
  res.json({
    msg: 'Hello API 👋',
  })
})

const loginApi = require('./components/login/loginApi')

app.post('/v1/register', loginApi.register)
app.post('/v1/login', loginApi.login)
app.post('/v1/forget_password', loginApi.forgetPass)
app.post('/v1/reset_password', loginApi.resetPass)

const settingApi = require('./components/settings/settingApi')

app.post('/v1/update_password', settingApi.updatePass)
app.post('/v1/update_username', settingApi.updateUname)

const adminApi = require('./components/admin/adminApi')

app.get('/v1/devices', adminApi.getDevices)
app.post('/v1/devices', adminApi.addDevice)
app.post('/v1/sensors', adminApi.getSensors)
app.get('/v1/admin/logins', adminApi.getUsers)
app.put('/v1/devices', adminApi.updateDevice)
app.post('/v1/binds', adminApi.binds)
app.get('/v1/binds', adminApi.getBinds)
app.put('/v1/binds', adminApi.updateBinds)
app.delete('/v1/binds', adminApi.deleteBinds)

const deviceApi = require('./components/device/deviceApi')

app.post('/v1/sensors', deviceApi.postSensorVal)

const helperApi = require('./components/helper/helperApi')

app.post('/v1/check_token', helperApi.checkToken)

const userApi = require('./components/user/userApi')

app.post('/v1/users', userApi.getPersonalData)
app.put('/v1/users', userApi.updatePersData)
app.post('/v1/users/sensors', userApi.getSensors)
app.get('/v1/users/binds', userApi.getBinds)
app.get('/v1/users/sensors', tokenValidator.start, userApi.getBindSensor)
app.get('/v1/users/landing', userApi.getLandingPage)
app.post('/v1/users/image', userApi.uploadImage)
app.post('/v1/users/keluhan', userApi.keluhan)

const aksiBerbagiApi = require('./components/aksiBerbagi/aksiBerbagiApi')

app.post('/v1/aksi_berbagi', aksiBerbagiApi.getColData)

const calcApi = require('./components/calc/calcApi')

app.post('/v1/calc', calcApi.calcPost)
app.get('/v1/calc', calcApi.calcGet)
app.put('/v1/calc', calcApi.calcPut)

const billApi = require('./components/bill/billApi')

app.get('/v1/bill', tokenValidator.start, billApi.getBill)
app.post('/v1/bill', billApi.postBill)

const priceApi = require('./components/prices/priceApi')

app.get('/v1/price', tokenValidator.start, priceApi.getPrice)
app.post('/v1/price', priceApi.postPrice)

const adminPicApi = require('./components/adminPic/adminPicApi')

app.get('/v1/adminpic/bill', tokenValidator.start, adminPicApi.getBill)
app.post('/v1/adminpic/bill', tokenValidator.start, adminPicApi.postBill)

app.listen(5000, () => {
  console.log('Server started on 5000')
})
