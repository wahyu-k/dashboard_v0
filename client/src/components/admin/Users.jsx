import React, { useEffect, useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
  }, [])

  const uploadEditData = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/admin/plan`,
        { user_id: id, plan },
      )
      if (response) {
        console.log(response.data)
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

  return (
    <div>
      <h2>User Data</h2>
      <table>
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
            label="Nominal"
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
            Cancel
          </Button>
          <Button
            onClick={() => {
              uploadEditData()
            }}
            color="primary"
          >
            Bayar
          </Button>
        </DialogActions>
      </Dialog>
      <button onClick={() => getUsersHandler()} disabled={isLoading}>
        Get All User Data
      </button>
    </div>
  )
}

export default Users
