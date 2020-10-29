import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import css from './UpdatePersonal.module.css'

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
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const token = await localStorage.getItem('_s_t')

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users`,
        {
          token,
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
        })
      }
    } catch (error) {
      console.error(error.response.data)
    }
  }

  submitHandler = async (event) => {
    event.preventDefault()
    console.log(this.state)
    const { first_name, last_name, dob, prov, region } = this.state
    try {
      const token = await localStorage.getItem('_s_t')
      const data = {
        token,
        first_name,
        last_name,
        dob,
        prov,
        region,
      }
      const response = await axios.put('http://localhost:5000/v1/users', data)

      if (response) {
        console.log(response.data)
      }
    } catch (error) {
      console.error(error.response.data)
    }
  }

  render() {
    return (
      <div className={css.update_personal_container}>
        <h3>Update Personal Data</h3>
        <div className={css.line}></div>
        <form onSubmit={(event) => this.submitHandler(event)}>
          <div className={css.form__container}>
            <TextField
              style={{
                width: '95%',
              }}
              label="First Name"
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
                width: '95%',
              }}
              label="Last Name"
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
                width: '95%',
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
                width: '95%',
              }}
              label="Region"
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
                width: '95%',
              }}
              label="Province"
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
              startIcon={<AccountCircleIcon />}
            >
              Update Personal Data
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdatePersonalData
