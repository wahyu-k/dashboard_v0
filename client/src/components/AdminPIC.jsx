import React, { useEffect } from 'react'
import axios from 'axios'

function AdminPIC(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  const fetchData = async () => {
    // eslint-disable-next-line
    const response = await axios.get()
  }

  return (
    <div>
      <h2>Kelola Pembayaran</h2>
      <button onClick={() => fetchData()}>Fetch Data</button>
    </div>
  )
}

export default AdminPIC
