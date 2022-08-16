import styled from "styled-components";
import { Button } from "@mui/material"
import AppBar from '@mui/material/AppBar';
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@mui/icons-material/StarBorder';
import Picture1 from "../imgs/Online test-bro.svg"
import Picture2 from '../imgs/Inbox cleanup-pana.svg'
// import Link from '@mui/material/Link';
import { SecondaryButton } from "components/atoms/buttons/SecondaryButton";
import { PrimaryButton } from "components/atoms/buttons/PrimaryButton"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const tiers = [
  {
    title: '機能が豊富',
    description: [
      // '音声波形',
      // 'キーボード操作対応',
      // '速度変更',
      // 'スキップ',
      // 'ループ再生',
      '音声波形・キー操作・速度変更・スキップ・ループ再生など様々な機能を搭載。',
      '詳しい機能説明はサインアップ後「詳細（？がついている部分）」をクリックすれば確認できます。'
    ],
  },
  {
    title: '好きな音声が使える',
    subheader: 'Most attractive feature',
    description: [
      // '自分の好きな音声ファイルをアップロードして使えます',
      // '好きな参考書・勉強本の音声が使えます',
      // '音声を保存できます（5つまで・ファイルサイズは8MBまで）',
      // 'クイックモードを使うとファイルを保存することなく、すぐに学習をスタートできます',
      '自分の好きな音声ファイルをアップロードして使えるので、好きな参考書・勉強本の音声でディクテーションができます。語学学習におすすめです。'

    ],
  },
  {
    title: '音声を保存できる',
    description: [
      // '50 users included',
      // '30 GB of storage',
      // 'Help center access',
      // 'Phone & email support',
      '音声を最大5つまで保存できます。（ファイルサイズは最大8MBまで）',
      '＊クイックモードを使用することで、音声を保存することなくすぐに学習をはじめることもできます。'
    ],
  },
];

export const Top = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container >
                <Typography
                  component="h1"
                  variant="h1"
                  align="center"
                  // color="text.primary"
                  gutterBottom
                  sx={{ fontFamily: "Century" }}
                >
                  <FontBorder>
                    DICTUM
                  </FontBorder>

                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 2 }} paragraph >
                  自分の好きな音声で学習ができるディクテーションアプリ「DICTUM」
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    component={Link}
                    to="/signin"
                    fullWidth={true}
                    sx={{ border: 2, borderRadius: 369, color: "#2C91FF" }}>
                    Signinページへ
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    fullWidth={true}
                    sx={{ border: 2, borderRadius: 369, color: "#ff4400" }}>
                    Signupページへ
                  </Button>
                </Stack>
              </Container>
              <Typography variant="h3" component="h3" gutterBottom sx={{ textAlign: 'center', margin: 13, fontFamily: "Century", border: 3 }}>
                DICTUMの特徴
              </Typography>
              <Container sx={{ display: "flex" }}>
                <UlFlex>
                  <li><img src={Picture1} alt="picture" width="400" height="300" /></li>
                  <li><img src={Picture2} alt="picture" width="400" height="300" /></li>
                </UlFlex>
              </Container>


              <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                  {tiers.map((tier) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid
                      item
                      key={tier.title}
                      xs={12}
                      sm={tier.title === 'Enterprise' ? 12 : 6}
                      md={4}
                    >
                      <Card sx={{ height: 300 }}>
                        <CardHeader
                          title={tier.title}
                          subheader={tier.subheader}
                          titleTypographyProps={{ align: 'center' }}
                          action={tier.title === 'Pro' ? <StarIcon /> : null}
                          subheaderTypographyProps={{
                            align: 'center',
                          }}
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[700],
                          }}
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'baseline',
                              mb: 2,
                              mt: -1.5
                            }}
                          >
                            <Typography variant="h6" color="text.secondary">

                            </Typography>
                          </Box>

                          {tier.description.map((line) => (
                            <Typography
                              // component="li"
                              variant="subtitle1"
                              align="center"
                              key={line}
                            >
                              {line}
                            </Typography>
                          ))}

                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>

            </Box>
          </main>
        </Container>
      </ThemeProvider>
    </>
  )
}

const UlFlex = styled.ul`
  display: flex;
`;
const FontBorder = styled.div`
  -webkit-text-stroke: 1px #ff4400; 
  text-stroke: 1px #ff4400;
  color: #0000ff;
`;