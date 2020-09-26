import React, { Component } from 'react'
import axios from 'axios'

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
      const response = await axios.post('http://localhost:5000/v1/users', {
        token,
      })

      console.log(response.data)

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
      <div>
        <h2>Update Personal Data</h2>
        <form onSubmit={(event) => this.submitHandler(event)}>
          <label>First Name</label>
          <input
            value={this.state.first_name}
            onChange={(event) =>
              this.setState({
                first_name: event.target.value,
              })
            }
          />
          <br />
          <label>Last Name</label>
          <input
            value={this.state.last_name}
            onChange={(event) =>
              this.setState({
                last_name: event.target.value,
              })
            }
          />
          <br />
          <label>Date of Birth</label>
          <input
            value={this.state.dob}
            type="date"
            onChange={(event) =>
              this.setState({
                dob: event.target.value,
              })
            }
          />
          <br />
          <label>Region</label>
          <input
            value={this.state.region}
            onChange={(event) =>
              this.setState({
                region: event.target.value,
              })
            }
          />
          <br />
          <label>Province</label>
          <input
            value={this.state.prov}
            onChange={(event) =>
              this.setState({
                prov: event.target.value,
              })
            }
          />
          <button type="submit">Update</button>
        </form>
      </div>
    )
  }
}

export default UpdatePersonalData
