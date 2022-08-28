import React, { useCallback, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera"
import CancelIcon from "@material-ui/icons/Cancel"
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DoneIcon from '@mui/icons-material/Done';
import { Input } from '@mui/material';
import AlertMessage from "../molecules/AlertMessage"
import { makeStyles, createStyles } from '@mui/styles';

import { AddText } from "../molecules/AddText";
import { createLearningMaterials } from "../../apis/learning_material"

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  inputFileBtn: {
    marginTop: "10px"
  },
  submitBtn: {
    marginTop: "10px",
    marginLeft: "auto"
  },
  box: {
    margin: "2rem 0 4rem",
    width: 320
  },
  preview: {
    width: "100%"
  }
}))

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
}

interface LearningMaterialFormProps {
  handleGetLearningMaterials: Function
  userId: string
  over: boolean
}

const LearningMaterialForm = ({ handleGetLearningMaterials, userId, over }: LearningMaterialFormProps) => {
  const classes = useStyles()
  console.log(over)
  const [subject, setSubject] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [answer, setAnswer] = useState<string>("")
  const [file, setFile] = useState<File>()
  const [preview, setPreview] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [createMessage, setCreateMessage] = useState<string>("")
  const [createColor, setCreateColor] = useState<boolean>(true)

  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    console.log(file)
    console.log(file.size)
    if (file.size > 1024 * 1024 * 8) {
      setCreateMessage("音声ファイルは最大8MBまでです。")
      setCreateColor(false)
      setAlertMessageOpen(true)
      setFile(undefined)
    } else {
      setFile(file)
    }

  }, [])

  // プレビュー機能
  const previewImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    console.log(file)
  }, [])

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("subject", subject)
    formData.append("body", body)
    if (file) formData.append("file", file)
    formData.append("answer", answer)


    return formData
  }

  const handleCreateLearningMaterial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await createLearningMaterials(userId, data)
      .then((res) => {
        setTimeout(() => {
          handleGetLearningMaterials()
        }, 2000);
        console.log(res);
        setSubject("")
        setBody("")
        setAnswer("")
        setPreview("")
        setFile(undefined)
        setCreateMessage("登録に成功しました！")
        setCreateColor(true)
        setAlertMessageOpen(true)
      })
      .catch(error => {
        setTimeout(() => {
          handleGetLearningMaterials()
        }, 2000);
        console.log(error);
        setSubject("")
        setBody("")
        setAnswer("")
        setPreview("")
        setFile(undefined)
        setCreateMessage("登録できる音声は５つまでです")
        setCreateColor(false)
        setAlertMessageOpen(true)
      });
  }

  const [register, setRegister] = useState<boolean>(false)
  return (
    <>
      <div id="createLM">
        <Button disabled={over} onClick={() => setRegister(!register)}>
          <AddText><h3>新しい音声ファイルの登録はこちら</h3></AddText>
        </Button>
      </div>


      {register && !over ?
        <>
          <form className={classes.form} noValidate onSubmit={handleCreateLearningMaterial}>
            <TextField
              placeholder="科目を入力してください。 例）英語"
              variant="outlined"
              multiline
              fullWidth
              minRows={4}
              margin="dense"
              value={subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSubject(e.target.value)
              }}
            />
            <TextField
              placeholder="教材・音声名などを入力してください。 例）旅行先での英会話"
              variant="outlined"
              multiline
              fullWidth
              minRows={4}
              margin="dense"
              value={body}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBody(e.target.value)
              }}
            />
            <TextField
              placeholder="答えを入力してください。 *答えは入力しなくてもOK"
              variant="outlined"
              multiline
              fullWidth
              minRows={4}
              margin="dense"
              value={answer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAnswer(e.target.value)
              }}
            />
            <div className={classes.inputFileBtn}>
              <label htmlFor="icon-button-file">
                <Input
                  id="icon-button-file"
                  type="file"
                  sx={{ display: "none", accept: "audio/*" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    uploadImage(e)
                    previewImage(e)
                  }}
                />
                <IconButton color="inherit" component="span">
                  {file ?
                    <h6><DoneIcon />音声ファイルが選択されました</h6>
                    : <h6><LibraryMusicIcon />音声ファイルを選択してください</h6>
                  }

                </IconButton>
              </label>
            </div>

            <div className={classes.submitBtn}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="inherit"
                disabled={!subject || subject.length > 140 || !body || body.length > 140 || file == undefined}
                className={classes.submitBtn}
              >
                登録する
              </Button>
            </div>
          </form>
          {preview ?
            <Box
              sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400" }}
              className={classes.box}
            >
              <IconButton
                color="inherit"
                onClick={() => setPreview("")}
              >
                <CancelIcon />
              </IconButton>
              {file?.name}
            </Box> : null
          }
        </> :
        <>
          {console.log(register)}
        </>}


      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity={createColor ? "success" : "error"}
        message={createMessage}
      />
    </>
  )
}

export default LearningMaterialForm