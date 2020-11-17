const path = require('path')
// require('dotenv').config({ path: path.join(__dirname, '../.env') })
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

// const multer = require('multer')
// const upload = multer()

// for parsing application/json

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// for parsing multipart/form-data
// app.use(upload.array())

// console.log(path.join(__dirname, '../client/build'))
// app.use(express.static(path.join(__dirname, '../client/build')))

app.use(express.json())
app.use(cors())
app.use(helmet())

const tokenValidator = require('./components/helper/tokenValidation')

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  res.json({
    msg: 'Hello API 👋',
  })
})

// const ImageController = require('./user/imageController')
// app.post('/api/uploadImage', ImageController.uploadImageToS3)

// const profile = require('./config/profile')
// app.use('/config/profile', profile)
// app.post('/api/profile/profile-img-upload', profile)
// app.post('/api/profile/multiple-file-upload', profile)

const loginApi = require('./components/login/loginApi')

app.post('/v1/register', loginApi.register)
app.post('/v1/login', loginApi.login)
app.post('/v1/forget_password', loginApi.forgetPass)
app.post('/v1/reset_password', loginApi.resetPass)

const settingApi = require('./components/settings/settingApi')

app.post('/v1/update_password', tokenValidator.start, settingApi.updatePass)
app.post('/v1/update_username', tokenValidator.start, settingApi.updateUname)

const adminApi = require('./components/admin/adminApi')

app.get('/v1/devices', adminApi.getDevices)
app.post('/v1/devices', adminApi.addDevice)
app.get('/v1/sensors', adminApi.getSensors)
app.get('/v1/admin/logins', adminApi.getUsers)
app.put('/v1/devices', adminApi.updateDevice)
app.post('/v1/binds', adminApi.binds)
app.get('/v1/binds', adminApi.getBinds)
app.put('/v1/binds', adminApi.updateBinds)
app.put('/v1/admin/plan', adminApi.editPlan)
app.delete('/v1/binds', adminApi.deleteBinds)

const deviceApi = require('./components/device/deviceApi')

app.post('/v1/sensors', deviceApi.postSensorVal)
app.post('/v1/post_sensor_by_device', deviceApi.postByDevice)

const helperApi = require('./components/helper/helperApi')

app.post('/v1/check_token', helperApi.checkToken)

const userApi = require('./components/user/userApi')

app.get('/v1/users', tokenValidator.start, userApi.getPersonalData)
app.put('/v1/users', tokenValidator.start, userApi.updatePersData)
app.post('/v1/users/sensors', userApi.getSensors)
app.get('/v1/users/binds', userApi.getBinds)
app.get('/v1/users/sensors', tokenValidator.start, userApi.getBindSensor)
app.get('/v1/users/landing', userApi.getLandingPage)
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

const notifApi = require('./components/notif/notifApi')

app.post('/v1/notif', tokenValidator.start, notifApi.postNotif)
app.get('/v1/notif', tokenValidator.start, notifApi.getNotif)

const imageUpload = require('./components/image/uploadImage')
const reportImageUpload = require('./components/image/reportImage')
app.post('/v1/profileImage', imageUpload)
app.post('/v1/reportImage', tokenValidator.start, reportImageUpload)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
