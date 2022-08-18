import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
        DICTUM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="body1" sx={{ margin: 1 }}>
          好きな音声でディクテーションができるアプリ「DICTUM」
        </Typography>
        <Copyright />
      </Container>
    </>


  );
}