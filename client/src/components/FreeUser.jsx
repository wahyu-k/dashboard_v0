import React, { useEffect } from 'react'

function FreeUser(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return <div>Free User</div>
}

export default FreeUser
