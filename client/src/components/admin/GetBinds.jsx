import React, { useState } from 'react'
import axios from 'axios'

function GetBinds() {
  const [binds, setBinds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const getBindsHandler = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/binds`,
      )
      if (response) {
        setIsLoading(false)
        setBinds(response.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  const pagination = async (p) => {
    if (p === 'home') {
      setPage(0)
    } else if (p === 'before') {
      if (page === 0) {
        setPage(0)
      } else if (binds.length <= rowsPerPage) {
        setPage(0)
      } else {
        setPage(page - 1)
      }
    } else if (p === 'after') {
      if (binds.length <= rowsPerPage) {
        setPage(0)
      } else if (page >= binds.length / rowsPerPage - 1) {
        setPage(Math.ceil(binds.length / rowsPerPage - 1))
      } else {
        setPage(page + 1)
      }
    } else if (p === 'last') {
      if (binds.length <= rowsPerPage) {
        setPage(0)
      } else {
        setPage(Math.ceil(binds.length / rowsPerPage - 1))
      }
    }
  }

  return (
    <div>
      <h2>User and Device Binds</h2>
      <table>
        <tbody>
          <tr>
            <th>User Id</th>
            <th>Device Id</th>
          </tr>
          {binds
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((theBinds, i) => (
              <tr key={i}>
                <td>{theBinds.user_id}</td>
                <td>
                  <ul>
                    {theBinds.device_id.map((dev, a) => (
                      <li key={a}>{dev}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {binds.length === 0 ? null : (
        <div>
          <button onClick={() => pagination('home')}>Halaman Awal</button>
          <button onClick={() => pagination('before')}>
            Halaman Sebelumnya
          </button>
          <button onClick={() => pagination('after')}>
            Halaman Setelahnya
          </button>
          <button onClick={() => pagination('last')}>Halaman Terakhir</button>
        </div>
      )}

      <button onClick={() => getBindsHandler()} disabled={isLoading}>
        Get User Binds
      </button>
    </div>
  )
}

export default GetBinds
