import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // Redirect,
} from 'react-router-dom'
import ForgetPass from './components/login/ForgetPass'
import Login from './components/Login'
import Register from './components/login/Register'
import ResetPass from './components/login/ResetPass'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Admin from './components/Admin'
// import AksiBerbagi from './components/AksiBerbagi'
import loading_siab from './img/loading_siab.png'
import css from './app.module.css'
import jwt from 'jsonwebtoken'
import AdminPIC from './components/AdminPIC'
import FreeUser from './components/FreeUser'
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import siab_logo from './img/login/logo_siab.png'
import LandingPage from './components/LandingPage'

const drawerWidth = 225

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
  logoSiab: {
    margin: '0 auto',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const accountMenuList = [
  {
    name: 'Masuk',
    icon: <MeetingRoomOutlinedIcon />,
    link: '/login',
  },
  {
    name: 'Daftar',
    icon: <CreateOutlinedIcon />,
    link: '/register',
  },
  {
    name: 'Lupa Kata Sandi',
    icon: <VpnKeyOutlinedIcon />,
    link: '/forget_password',
  },
]

function App(props) {
  const [isLogin, setIsLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminPIC, setIsAdminPIC] = useState(false)
  const [isFreeUser, setIsFreeUser] = useState(false)
  const [isPremiumUser, setIsPremiumUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuPos, setMenuPos] = useState('')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('_s_t')

      try {
        const session = await jwt.decode(
          token,
          process.env.REACT_APP_JWT_SECRET,
        )

        if (session) {
          switch (session.plan) {
            case 1:
              setIsFreeUser(false)
              setIsPremiumUser(true)
              setIsAdminPIC(false)
              setIsAdmin(false)
              break
            case 2:
              setIsFreeUser(false)
              setIsPremiumUser(false)
              setIsAdminPIC(true)
              setIsAdmin(false)
              break
            case 7:
              setIsFreeUser(false)
              setIsPremiumUser(false)
              setIsAdminPIC(false)
              setIsAdmin(true)
              break
            default:
              setIsFreeUser(true)
              setIsPremiumUser(false)
              setIsAdminPIC(false)
              setIsAdmin(false)
              break
          }
          setIsLogin(true)
          setIsLoading(false)
        } else {
          throw new Error('Token error!')
        }
      } catch (error) {
        setIsAdmin(false)
        setIsLogin(false)
        setIsFreeUser(false)
        setIsPremiumUser(false)
        setIsAdminPIC(false)
        setIsLoading(false)
        localStorage.clear()
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

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img className={classes.logoSiab} alt="siab-logo" src={siab_logo} />
      </div>
      <Divider />
      <List>
        <Link to="/" style={{ color: '#000' }}>
          <ListItem button>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {accountMenuList.map((menu, index) => (
          <Link to={menu.link} style={{ color: '#000' }} key={index}>
            <ListItem button key={index}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <MenuBookOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Panduan" />
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">{menuPos}</Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" exact>
              {() => {
                if (!isLogin) {
                  return (
                    <LandingPage
                      onView={() =>
                        setMenuPos('Selamat Datang di SIAB Indonesia')
                      }
                    />
                  )
                  // return <FreeUser  />
                  // return <Redirect to="/login" />
                } else {
                  if (isAdmin) {
                    return <Admin />
                  } else {
                    if (isAdminPIC) {
                      return <AdminPIC />
                    } else {
                      if (isPremiumUser) {
                        return <Home />
                      } else {
                        if (isFreeUser) {
                          return (
                            <FreeUser onView={() => setMenuPos('Dashboard')} />
                          )
                        }
                      }
                    }
                  }
                }
              }}
            </Route>
            <Route path="/login" exact>
              <Login onView={() => setMenuPos('Masuk Akun')} />
            </Route>
            <Route path="/register" exact>
              <Register onView={() => setMenuPos('Daftar Akun')} />
            </Route>
            <Route path="/forget_password" exact>
              <ForgetPass onView={() => setMenuPos('Reset Kata Sandi')} />
            </Route>
            <Route path="/reset_password/:token" exact>
              <ResetPass />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default App
