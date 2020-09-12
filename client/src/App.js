import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ForgetPass from './components/ForgetPass'
import Login from './components/Login'
import Register from './components/Register'
import ResetPass from './components/ResetPass'
import axios from 'axios'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Admin from './components/Admin'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const token = localStorage.getItem('_s_t')

      try {
        const response = await axios.post(
          'http://localhost:5000/v1/check_token',
          {
            token,
          },
        )

        if (response.data) {
          if (response.data.username === 'admin') {
            setIsAdmin(true)
          }
          setIsLogin(true)
          setIsLoading(false)
        }
      } catch (error) {
        setIsAdmin(false)
        setIsLogin(false)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <div></div>
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isLogin ? isAdmin ? <Admin /> : <Home /> : <Login />}
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forget_password" exact>
          <ForgetPass />
        </Route>
        <Route path="/reset_password/:token" exact>
          <ResetPass />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
