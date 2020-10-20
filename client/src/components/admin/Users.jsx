import React, { useEffect, useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUsersHandler()
  }, [])

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

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'username', headerName: 'Username', width: 130 },
  //   { field: 'email', headerName: 'Email', width: 230 },
  //   {
  //     field: 'plan',
  //     headerName: 'Plan',
  //     width: 80,
  //   },
  //   {
  //     field: 'created_at',
  //     headerName: 'Created At',
  //     width: 250,
  //     valueGetter: (params) => `${epochToDate(params.getValue('created_at'))}`,
  //   },
  //   {
  //     headerName: 'Edit',
  //     width: 100,
  //   },
  // ]

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
                <button>Edit</button>
              </td>
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
