require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

/**
 * @GET
 * Hello API
 *
 * @readonly
 */
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
app.get('/v1/sensors', adminApi.getSensors)
app.get('/v1/admin/logins', adminApi.getUsers)
app.put('/v1/devices', adminApi.updateDevice)

const deviceApi = require('./components/device/deviceApi')

app.post('/v1/sensors', deviceApi.postSensorVal)

const helperApi = require('./components/helper/helperApi')

app.post('/v1/check_token', helperApi.checkToken)

const userApi = require('./components/user/userApi')

app.post('/v1/users', userApi.getPersonalData)
app.put('/v1/users', userApi.updatePersData)

const aksiBerbagiApi = require('./components/aksiBerbagi/aksiBerbagiApi')

app.post('/v1/aksi_berbagi', aksiBerbagiApi.getColData)

app.listen(5000, () => {
  console.log('Server started on 5000')
})
