import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "App"
import LearningMaterialList from "components/organisms/LearningMaterialList"
import { Button } from "@mui/material"
import AlarmIcon from '@mui/icons-material/Alarm';
import { Steps, Hints } from "intro.js-react"
import 'intro.js/introjs.css';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import styled from "styled-components"

// とりあえず認証済みユーザーの名前やメールアドレスを表示

const CBox = styled.div`
  margin: 2em 25px;
  padding: 1em;
  background-color: #f7f7ff;
  border: dashed 3px #c7eaff;
  box-shadow: 0 0 0 10px #f1f8e9, 0 0 0 25px #2c91ff;
  border-radius: 3px;
  text-align: center;
`;

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  // if(onPlaying===true) {
  //   setOnPlaying(false)
  //   window.location.reload();
  //   alert("リロードしました");
  // }

  const [enabled, setEnabled] = useState(false)
  const [initialStep, setInitialStep] = useState(0)

  const onExit = () => {
    setEnabled(false)
  }
  const steps = [
    {
      element: '#quickMode',
      intro: '音声を登録するだけで、使用できます。ファイルや答えなどを保存する必要がない時に便利です。',
      position: 'bottom',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '#createLM',
      intro: '音声情報を登録できます。科目（必須）・教材（必須）・答え（任意）・ファイル（必須）を入力してください。最大で５つまで保存できます。',
      position: 'bottom',
    },
    {
      element: '#userCard',
      intro: '保存した音声が表示されます。詳しくは「詳細」をクリックしてください。',
      position: 'right',
    },

  ];


  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Button size="large" onClick={() => { setEnabled(true) }}><QuestionMarkIcon />機能紹介</Button>
            <CBox>
              <h1>Signed in successfully!</h1>
              <h2>Email: {currentUser?.email}</h2>
              <h2>Name: {currentUser?.name}</h2>
            </CBox>

            <Steps
              enabled={enabled}
              steps={steps}
              initialStep={initialStep}
              onExit={onExit}
            />
            {/* <button id="help">Help</button> */}
            {/* <button id="about">About</button> */}
            {/* <button id="contact">Contact Us</button> */}
            <Link to={"/quickMode"}>
              <Button id="quickMode" fullWidth sx={{ border: 1 }}>
                <AlarmIcon /><h2>クイックモード</h2>
              </Button>
            </Link>
            <div id="userCard">
              <LearningMaterialList userId={currentUser.id} />
            </div>

          </>
        ) : (
          <h1>Not signed in</h1>
        )
      }
    </>
  )
}

export default Home