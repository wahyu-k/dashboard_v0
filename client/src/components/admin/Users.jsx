import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getUsersHandler = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/v1/admin/logins')
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
            <th>Created At</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{epochToDate(user.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => getUsersHandler()} disabled={isLoading}>
        Get All User Data
      </button>
    </div>
  )
}

export default Users
