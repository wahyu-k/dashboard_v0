import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ForgetPass from './components/login/ForgetPass'
import Login from './components/Login'
import Register from './components/login/Register'
import ResetPass from './components/login/ResetPass'
import axios from 'axios'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Admin from './components/Admin'
// import AksiBerbagi from './components/AksiBerbagi'
import loading_siab from './img/loading_siab.png'
import css from './app.module.css'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const token = localStorage.getItem('_s_t')

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/v1/check_token`,
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
    return (
      <div className={css.loading__container}>
        <img alt="loading_siab" src={loading_siab} />
      </div>
    )
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
        {/* <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/aksiberbagi">
          <AksiBerbagi />
        </Route> */}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
