import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Picture1 from "../imgs/Online test-bro.svg"

export const About = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
            DICTUMの特徴
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'DICTUMでは、あなたの好きな音声でディクテーションの勉強をすることができます。'}
            {'さらに、「音声波形」や「キーボード操作」など、様々な機能を搭載しているので、快適にディクテーションの勉強ができます。'}
            {'各機能の使い方紹介（？マークがついているもの）をクリックすることで、詳しい説明をみることができます。'}
          </Typography>
          <img src={Picture1} alt="picture" />

          <Typography variant="h3" component="h3" gutterBottom sx={{ textAlign: 'center' }}>
            注意事項など
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            {'・音声は最大5つまで登録できます。また、音声ファイルは最大8MBまでです。'}<br />
            {'・クイックモードでは、音声ファイルサイズに制限をかけていませんが、音声ファイルのサイズ制限は特に設けておりませんが、再生するのに'}
            <a href="http://www.xucker.jpn.org/pc/wavesurfer_tips.html">最大元データーの20倍ほどのメモリが必要</a>
            {'との情報がございました。そのため、最大でも200Mバイトまでのデータにすることを強くお勧め致します。'}
            <br />
            {'・なお、万が一お使いのコンピュータにアップロードした音声ファイルのサイズが原因で不具合、故障が発生したとしても、私は一切の責任を負いません。気を付けてご使用ください。'}
            <br />
            <a href="https://github.com/senseImamuraY">*私のGitHubアカウントはこちら*</a>
          </Typography>
          <Typography variant="body1">＊画像は<a href="https://storyset.com/people">People illustrations by Storyset</a>を利用しています。</Typography>
          <Typography variant="body1">音声の波形は<a href="https://www.wizard-notes.com/entry/javascript/wavesurfer-js">こちらのサイト</a>
            に載っているものを使用させていただきました。<a href="https://licenses.opensource.jp/BSD-3-Clause/BSD-3-Clause.html">
              使用させて頂いたコードのライセンスはこちら</a></Typography>
        </Container>
      </Box>
    </>
  );
}