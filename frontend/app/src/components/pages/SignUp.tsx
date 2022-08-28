import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@material-ui/core/Box"
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { makeStyles, createStyles } from '@mui/styles';

import { AuthContext } from "../../App"
import AlertMessage from "../molecules/AlertMessage"
import { signUp } from "../../apis/auth"
import { SignUpParams } from "../../interfaces/index"
import { WidthChanger } from "../../templates/WidthChanger"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 6
  },
  submitBtn: {
    marginTop: 2,
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: 2,
    maxWidth: 400
  }
}))

const theme = createTheme();

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(params)


      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")
        console.log(res)
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
          <Grid item={true} container xs={12} component="main" sx={{ height: '100vh' }}>
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
                <form noValidate autoComplete="off">
                  <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Sign Up" />
                    <CardContent>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Name"
                        value={name}
                        margin="dense"
                        onChange={event => setName(event.target.value)}
                      />
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
                        value={password}
                        margin="dense"
                        autoComplete="current-password"
                        onChange={event => setPassword(event.target.value)}
                      />
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Password Confirmation"
                        type="password"
                        value={passwordConfirmation}
                        margin="dense"
                        autoComplete="current-password"
                        onChange={event => setPasswordConfirmation(event.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        color="primary"
                        disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                        className={classes.submitBtn}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </CardContent>
                  </Card>
                </form>

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

export default SignUp