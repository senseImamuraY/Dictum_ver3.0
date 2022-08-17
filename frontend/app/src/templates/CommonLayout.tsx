import React from "react"

import { Container, Grid } from "@material-ui/core"
// import { makeStyles } from "@material-ui/core/styles"
import { makeStyles, createStyles } from '@mui/styles';

import Header from "components/organisms/Header"
import StickyFooter from "components/organisms/Footer";
import { BackgroundColor } from "components/atoms/colors/BackgroundColor";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
    // width: "100%"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <BackgroundColor>
          <Container maxWidth="xl" className={classes.container}>
            <Grid container justifyContent="center">
              <Grid item>
                {children}
              </Grid>
            </Grid>
          </Container>
        </BackgroundColor>

      </main>
      <footer>
        <StickyFooter />
      </footer>
    </>
  )
}

export default CommonLayout