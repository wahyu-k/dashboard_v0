import React from 'react'

function ForgetPass() {
  const submitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h1>Forget Password</h1>
      <form onSubmit={(event) => submitHandler(event)}>
        <input placeholder="Email" />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ForgetPass
