import React, { useState } from 'react'
import axios from 'axios'
import "./forgetPass.modules.css"
import { useHistory } from 'react-router-dom'
import logo_siab from '../../img/register/logo_siab.png'
import { TextField } from '@material-ui/core'

function ForgetPass() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const submitHandler = (event) => {
    setIsLoading(true)
    event.preventDefault()
    sendResetPass()
  }

  const sendResetPass = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/forget_password`,
        {
          receiver: email,
        },
      )

      if (response) {
        alert("We've send you an email to reset your password...")
        history.push('/')
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  return (
    <div className="backdrop">
      <div className="smalldrop">
      <div className="leftdrop">
        <div className="forget-container">
          <img alt="logo-siab" src={logo_siab}/>
          <div className="pass-container">
          <h1>Forget Password</h1>
          </div>
          <form onSubmit={(event) => submitHandler(event)}>
          <label>Email</label>
          <TextField
          placeholder="Akun@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
          required
          />
        
          <br />

          <button type="submit" disabled={isLoading}>
          Send Reset Password Link
          </button>
          </form>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default ForgetPass
