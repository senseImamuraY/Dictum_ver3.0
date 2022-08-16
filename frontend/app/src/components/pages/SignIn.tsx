import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { Theme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { AuthContext } from "App"
import AlertMessage from "../molecules/AlertMessage"
import { signIn } from "apis/auth"
import { SignInParams } from "interfaces/index"
import { WidthChanger } from "templates/WidthChanger"
// const useStyles = makeStyles((theme: Theme) => ({
//   container: {
//     marginTop: theme.spacing(6)
//   },
//   submitBtn: {
//     marginTop: theme.spacing(2),
//     flexGrow: 1,
//     textTransform: "none"
//   },
//   header: {
//     textAlign: "center"
//   },
//   card: {
//     padding: theme.spacing(2),
//     maxWidth: 400
//   },
//   box: {
//     marginTop: "2rem"
//   },
//   link: {
//     textDecoration: "none"
//   }
// }))

const theme = createTheme();

// サインイン用ページ
const SignIn: React.FC = () => {
  // const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <WidthChanger>
          <Grid container xs={12} component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* <Box sx={{ mt: 1 }}> */}
                <form noValidate autoComplete="off">
                  <Card sx={{ height: 400 }}>
                    {/* <Card className={classes.card}> */}
                    <CardHeader title="Sign In" />
                    {/* <CardHeader className={classes.header} title="Sign In" /> */}
                    <CardContent>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email"
                        value={email}
                        margin="dense"
                        onChange={event => setEmail(event.target.value)}
                      />
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        margin="dense"
                        autoComplete="current-password"
                        onChange={event => setPassword(event.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        color="info"
                        disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように

                        // className={classes.submitBtn}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                      <Box textAlign="center">
                        {/* <Box textAlign="center" className={classes.box}> */}
                        <Typography variant="body2">
                          Don't have an account? &nbsp;
                          <Link to="/signup">
                            {/* <Link to="/signup" className={classes.link}> */}
                            Sign Up now!
                          </Link>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </form>
                {/* </Box> */}
              </Box>
            </Grid>
          </Grid></WidthChanger>
      </ThemeProvider>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email or password"
      />
    </>
  )
}

export default SignIn