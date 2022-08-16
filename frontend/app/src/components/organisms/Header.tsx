import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"
import WaveSurfer from 'wavesurfer.js';
// import { createStyles, makeStyles,Theme } from "@material-ui/core/styles"
// import { makeStyles } from '@material-ui/styles';
import { makeStyles, createStyles } from '@mui/styles';

// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import { SampleComponent } from './SampleComponent'

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import { signOut } from "apis/auth"

import { AuthContext } from "App"

// const useStyles = makeStyles((theme: Theme) => createStyles({
//   iconButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textDecoration: "none",
//     color: "inherit"
//   },
//   linkBtn: {
//     textTransform: "none"
//   }
// }))

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn, onPlaying, setOnPlaying } = useContext(AuthContext)
  // const classes = useStyles({})
  const navigate = useNavigate()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }


  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (

          <Button
            color="inherit"
            // className={classes.linkBtn}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        )
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
            // className={classes.linkBtn}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
            // className={classes.linkBtn}
            >
              Sign Up
            </Button>
          </>
        )
      }
    } else {
      return <></>
    }
  }
  const [clickHeader, setClickHeader] = useState(false);

  const contextChecker = () => {
    if (onPlaying === true) {
      setClickHeader(true)
    }
  }
  if (onPlaying === true && clickHeader === true) {
    setOnPlaying(false)
    setClickHeader(false)
    window.location.reload()
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.iconButton}
            color="inherit"

          >

          </IconButton>
          <MenuIcon />
          <Typography
            component={Link}
            to="/"
            color="inherit"
            variant="h6"
            // className={classes.title}
            onClick={() => contextChecker()}
          >
            Home
          </Typography>
          <AuthButtons />
          <Button
            component={Link}
            to="/about"
            color="inherit"
          // className={classes.linkBtn}
          >
            about
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header