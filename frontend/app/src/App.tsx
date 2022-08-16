
import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter, Routes, Route, useParams, Link, Navigate, useNavigate } from "react-router-dom";

import CommonLayout from "./templates/CommonLayout"
import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"

import { getCurrentUser } from "apis/auth"
import { User } from "interfaces/index"
import { WSF, WSF_stock } from "./components/atoms/wevesurfer/wavesurfer";
import { Users } from './components/organisms/User';
import LearningMaterialList from "./components/organisms/LearningMaterialList";
import { Wavesurfer_react } from "components/atoms/wevesurfer/wavesurfer_react";
import { QuickMode } from "components/organisms/QuickMode";
import { StudyPlace } from "components/pages/StudyPlace";
import { Update } from "components/pages/Update";
import { NotFound } from "components/pages/NotFound";
import { About } from "./components/pages/About"
import { Top } from "./components/pages/Top"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  onPlaying: boolean
  setOnPlaying: React.Dispatch<React.SetStateAction<boolean>>
})



const App: React.FC = () => {
  // const { userId } = useParams();


  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [onPlaying, setOnPlaying] = useState<boolean>(false)
  console.log(onPlaying);
  // if(onPlaying===true) {
  //   setOnPlaying(false)
  //   window.location.reload();
  //   alert("リロードしました");
  // }

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      console.log(res)
      console.log(res?.data.isLogin)
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
        console.log("Yes current user")

      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
    // }, [currentUser])
  }, [setCurrentUser])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    // const { userId } = useParams();
    console.log(currentUser);
    // const [userId, setUserId] = useState<number>()
    // setUserId(currentUser?.id)
    // const navigate = useNavigate()
    if (!loading) {
      console.log(loading)
      console.log(isSignedIn)
      console.log(children)
      if (isSignedIn) {
        console.log(isSignedIn)

        return (

          <>

            {children}
            <p>ようこそDICTUMへ</p>

          </>

        )
      } else {
        console.log(isSignedIn)
        return (
          <>
            <Navigate to="/top" />

          </>

        )

      }
    } else {
      return <></>
    }
  }


  return (

    <>

      <BrowserRouter>
        <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, onPlaying, setOnPlaying }}>

          <CommonLayout>
            <Routes>

              <Route path="users/:usersId" element={<Users />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/quickMode" element={<QuickMode />} />
              <Route path="/learningMaterial/:learningMaterialId" element={<StudyPlace />} />
              <Route path="/learningMaterial/:learningMaterialId/update" element={<Update />} />
              <Route path="/about" element={<About />} />
              <Route path="/top" element={<Top />} />

              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Routes>
          </CommonLayout>
        </AuthContext.Provider>
      </BrowserRouter>

    </>
  );
}

export default App;
