import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import css from './UpdatePersonal.module.css'
import { Collapse, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export class UpdatePersonalData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      dob: '',
      region: '',
      prov: '',
      data: [],
      isError: false,
      isLoading: false,
      errorMsg: '',
      isSuccess: false,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      this.setState({
        isLoading: true,
        isError: false,
        errorMsg: '',
      })

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/users`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
        },
        {
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )

      if (response) {
        const { first_name, last_name, dob, region, prov } = response.data

        this.setState({
          first_name,
          last_name,
          dob,
          region,
          prov,
          isLoading: false,
        })
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        this.setState({
          errorMsg: error.message,
        })
      } else {
        this.setState({
          errorMsg: 'Ada yang salah, coba beberapa saat lagi!',
        })
      }
      this.setState({
        isLoading: false,
        isError: true,
      })
    }
  }

  submitHandler = async (event) => {
    this.setState({
      isLoading: true,
      isError: false,
      errorMsg: '',
      isSuccess: false,
    })

    event.preventDefault()
    const { first_name, last_name, dob, prov, region } = this.state
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/users`,
        {
          first_name,
          last_name,
          dob,
          prov,
          region,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )

      if (response) {
        this.setState({
          isLoading: false,
          isSuccess: true,
        })
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        this.setState({
          errorMsg: error.message,
        })
      } else {
        this.setState({
          errorMsg: 'Ada yang salah, coba beberapa saat lagi!',
        })
      }
      this.setState({
        isLoading: false,
        isError: true,
        isSuccess: false,
      })
    }
  }

  render() {
    return (
      <div className={css.update__personal__container}>
        <h3>Perbarui Datamu</h3>
        <div className={css.line}></div>
        <Collapse in={this.state.isError}>
          <Alert severity="error">{this.state.errorMsg}</Alert>
        </Collapse>
        <Collapse in={this.state.isSuccess}>
          <Alert severity="success">
            Datamu berhasil diperbaharui!
            <p /> Login kembali untuk memperbarui page!
          </Alert>
        </Collapse>
        <form onSubmit={(event) => this.submitHandler(event)}>
          <div className={css.form__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Nama Depan"
              value={this.state.first_name || ''}
              onChange={(event) =>
                this.setState({
                  first_name: event.target.value,
                })
              }
            />
          </div>
          <div className={css.form__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Nama Belakang"
              value={this.state.last_name || ''}
              onChange={(event) =>
                this.setState({
                  last_name: event.target.value,
                })
              }
            />
          </div>
          <div className={css.form__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Tanggal Lahir"
              value={this.state.dob || ''}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) =>
                this.setState({
                  dob: event.target.value,
                })
              }
            />
          </div>
          <div className={css.form__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Kabupaten/Kota"
              value={this.state.region || ''}
              onChange={(event) =>
                this.setState({
                  region: event.target.value,
                })
              }
            />
          </div>
          <div className={css.form__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Provinsi"
              value={this.state.prov || ''}
              onChange={(event) =>
                this.setState({
                  prov: event.target.value,
                })
              }
            />
          </div>
          <div align="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={
                this.state.isLoading ? (
                  <CircularProgress size="24px" />
                ) : (
                  <AccountCircleIcon />
                )
              }
              disabled={this.props.isLoading}
            >
              Perbarui Data
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdatePersonalData
