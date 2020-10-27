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
import { TablePagination } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import css from './AdminPIC.module.css'

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
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'Username', width: 130 },
    { field: 'dev_id', headerName: 'Device_id', width: 130 },
    { field: 'daily_flow', headerName: 'Pengunaan Harian', width: 130 },
    { field: 'daily_bill', headerName: 'Biaya Harian', width: 130 },
    { field: 'payment', headerName: 'Pembayaran', width: 130 },
    { field: 'created_at', headerName: 'Waktu', width: 130 },
  ]

  return (
    <div className={css.pic__container}>
      <h2>Kelola Pembayaran</h2>
      <div className={css.line}></div>
      <div className={css.pembayaran__container}>
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
        <div className={css.button__container}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Bayar
          </Button>
        </div>
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
      </div>
      <div className={css.tagihan__container}>
        <div className={css.tagihan__widget}>
          <div>
            <h3>Total Tagihan</h3>
            <div className={css.grey__line}></div>
            <h4>{total}</h4>
          </div>
          <div>
            <h3>Total Bayar</h3>
            <div className={css.grey__line}></div>
            <h4>{payment}</h4>
          </div>
          <div>
            <h3>Total Tagihan</h3>
            <div className={css.grey__line}></div>
            <h4>{payment - total}</h4>
          </div>
        </div>

        {filtered && (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={filtered} columns={columns} pageSize={5} />
          </div>
        )}

        <TablePagination
          component="div"
          count={filtered === null ? 0 : filtered.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

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
    </div>
  )
}

export default AdminPIC
