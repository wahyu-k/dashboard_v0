import React, { useEffect, useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { DataGrid } from '@material-ui/data-grid'
import css from './users.module.css'
import LandingPageWidget from '../landingpage/LandingPageWidget'

function Users() {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [plan, setPlan] = useState()
  const [id, setId] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleClickOpen = (user) => {
    setOpen(true)
    setPlan(user.plan)
    setId(user.id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    getUsersHandler()
    // function getRandomInRange(from, to, fixed) {
    //   return (Math.random() * (to - from) + from).toFixed(fixed) * 1
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    // }
    // for (let i = 1; i <= 50; i++) {
    //   console.log(
    //     `INSERT INTO devices(name, lat, lng, created_at, modified_at) VALUES('Cawengkal ${i}', ${getRandomInRange(
    //       -7.307182,
    //       -7.311182,
    //       6,
    //     )}, ${getRandomInRange(
    //       110.621523,
    //       110.624523,
    //       6,
    //     )}, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));`,
    //   )
    // }
  }, [])

  const uploadEditData = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/admin/plan`,
        { user_id: id, plan },
      )
      if (response) {
        console.log(response.data)
        handleClose()
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const getUsersHandler = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/admin/logins`,
      )
      if (response) {
        setIsLoading(false)
        setUsers(response.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'plan',
      headerName: 'Plan',
      width: 70,
    },
    {
      field: 'created_at',
      headerName: 'Waktu Pendaftaran',
      width: 250,
      valueGetter: (params) => `${epochToDate(params.getValue('created_at'))}`,
    },
    {
      field: 'edit',
      headerName: 'Atur',
      width: 140,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            // console.log(params)
            handleClickOpen(params.data)
          }}
        >
          Atur Plan
        </Button>
      ),
    },
  ]

  return (
    <div className={css.user__container}>
      <h3>User Data</h3>
      <div className={css.line}></div>
      {/* <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Created At</th>
            <th>Edit</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.plan}</td>
              <td>{epochToDate(user.created_at)}</td>
              <td>
                <button onClick={() => handleClickOpen(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={() => getUsersHandler()} disabled={isLoading}>
        Get All User Data
      </button>
      </table> */}

      <div>
        <h3>Recap:</h3>

        <div className={css.user__widget}>
          <LandingPageWidget
            text="Akun Free"
            nominal={
              users.filter((data) => {
                return data.plan === 0
              }).length
            }
          />
          <LandingPageWidget
            text="Akun Premium"
            nominal={
              users.filter((data) => {
                return data.plan === 1
              }).length
            }
          />
          <LandingPageWidget
            text="Akun Pengelola"
            nominal={
              users.filter((data) => {
                return data.plan === 2
              }).length
            }
          />
          <LandingPageWidget text="Jumlah Akun" nominal={users.length} />
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          disabled={isLoading}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <b>Edit</b>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nominal"
            label="Plan"
            type="number"
            fullWidth
            value={plan}
            onChange={(e) => {
              setPlan(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button
            onClick={() => {
              uploadEditData()
            }}
            color="primary"
          >
            Ubah
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Users
