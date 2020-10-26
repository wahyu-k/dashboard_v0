import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import epochToDate from '../helper/epochToDate'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 300,
  },
}))

function AdminPIC(props) {
  const classes = useStyles()
  const [data, setData] = useState(null)
  const [filtered, setFiltered] = useState(null)
  const [filter, setFilter] = useState('')
  const [dropdown, setDropdown] = useState(null)
  const [total, setTotal] = useState(0)
  const [payment, setPayment] = useState(0)
  const [open, setOpen] = useState(false)
  const [userPayment, setUserPayment] = useState(0)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    props.onView()
  }, [props])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/adminpic/bill`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
        },
      )

      if (response) {
        setData(response.data)
        setFiltered(response.data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    let helper = {}

    if (!data) {
      return
    }

    const redo = data.reduce((r, o) => {
      var key = o.dev_id

      if (!helper[key]) {
        helper[key] = Object.assign({}, o)
        r.push(helper[key])
      }

      return r
    }, [])

    setDropdown(redo)
  }, [data])

  useEffect(() => {
    const sumTotal = () => {
      if (!filtered) {
        return
      }

      let sum = 0
      let pay = 0

      filtered.forEach((data) => {
        sum = sum + data.daily_bill
        pay = pay + data.payment
      })

      setTotal(sum)
      setPayment(pay)
    }

    sumTotal()
  }, [filtered])

  useEffect(() => {
    if (data) {
      setFiltered(
        data.filter((value) => {
          return value.first_name + ' ' + value.last_name === filter
        }),
      )
    }
  }, [filter, data])

  const uploadPayment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/adminpic/bill`,
        {
          device_id: filtered && filtered.length > 0 && filtered[0].dev_id,
          payment: userPayment,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
        },
      )

      if (response) {
        fetchData()
        setUserPayment(0)
        handleClose()
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <h2>Kelola Pembayaran</h2>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Bayar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <b>Pembayaran</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pembayaran untuk pengguna: <b>{filter}</b>{' '}
            {filtered && filtered.length > 0 && filtered[0].dev_id}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nominal"
            label="Nominal"
            type="number"
            fullWidth
            value={userPayment}
            onChange={(e) => {
              setUserPayment(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              uploadPayment()
            }}
            color="primary"
          >
            Bayar
          </Button>
        </DialogActions>
      </Dialog>
      <FormControl className={classes.formControl}>
        <InputLabel>Pilih Pengguna</InputLabel>
        <Select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
          }}
        >
          {dropdown &&
            dropdown.map((theDropdown, i) => {
              return (
                <MenuItem
                  key={i}
                  value={theDropdown.first_name + ' ' + theDropdown.last_name}
                >
                  {theDropdown.first_name + ' ' + theDropdown.last_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
      <h3>Total Tagihan</h3>
      <h3>{total}</h3>
      <h3>Total Bayar</h3>
      <h3>{payment}</h3>
      <h3>Total Tagihan</h3>
      <h3>{payment - total}</h3>
      <table>
        <tbody>
          <tr>
            <td>No</td>
            <td>Nama Pengguna</td>
            <td>Device Id</td>
            <td>Debit Harian</td>
            <td>Tagihan Harian</td>
            <td>Pembayaran</td>
            <td>Tagihan Pada</td>
          </tr>

          {filtered &&
            filtered.map((theData, i) => {
              return (
                <tr key={i}>
                  <td>{theData.id}</td>
                  <td>{theData.first_name + ' ' + theData.last_name}</td>
                  <td>{theData.dev_id}</td>
                  <td>{theData.daily_flow}</td>
                  <td>{theData.daily_bill}</td>
                  <td>{theData.payment}</td>
                  <td>{epochToDate(theData.created_at)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPIC
