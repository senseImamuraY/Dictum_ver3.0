import React, { useCallback, useState, useContext } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Input } from '@mui/material';
import { Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import CancelIcon from "@material-ui/icons/Cancel"
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DoneIcon from '@mui/icons-material/Done';
import AlertMessage from "../molecules/AlertMessage"
import { makeStyles, createStyles } from '@mui/styles';

import { updateLearningMaterials } from "../../apis/learning_material"
import { AuthContext } from "../../App";

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
}






export const Update = () => {
  interface CustomizedState {
    state: {
      id: string
      subject: string
      body: string
      answer: string
      file: {
        url: File
      }
    }
  }


  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(state)
  const classes = useStyles()
  const userId = String(currentUser?.id);
  const id = String(state.state.id)
  const [subject, setSubject] = useState<string>(state.state.subject)
  const [body, setBody] = useState<string>(state.state.body)
  const [answer, setAnswer] = useState<string>(state.state.answer)
  const [file, setFile] = useState<File>()
  const [preview, setPreview] = useState<string>("")
  const [updateMessage, setUpdateMessage] = useState<string>("")
  const [updateColor, setUpdateColor] = useState<boolean>(true)
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    console.log(file)
    console.log(file.size)
    if (file.size > 1024 * 1024 * 8) {
      setUpdateMessage("音声ファイルは最大8MBまでです。")
      setUpdateColor(false)
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

  const navigate = useNavigate()
  const handleUpdateLearningMaterial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await updateLearningMaterials(userId, id, data)
      .then(() => {
        setTimeout(() => {
          navigate("/")
        }, 2000);
        console.log(e)
        setUpdateMessage("更新に成功しました")
        setUpdateColor(true)
        setAlertMessageOpen(true)

      })
      .catch(error => {
        setTimeout(() => {
          navigate("/")
        }, 2000);
        console.log(e)
        setUpdateMessage("更新に失敗しました")
        setUpdateColor(false)
        setAlertMessageOpen(true)

      });
  }


  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleUpdateLearningMaterial}>
        <TextField
          placeholder={state.state.subject}
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          margin="dense"
          value={subject}
          defaultValue={state.state.subject}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSubject(e.target.value)
          }}
        />
        <TextField
          placeholder={state.state.body}
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          margin="dense"
          value={body}
          defaultValue={state.state.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBody(e.target.value)
          }}
        />
        <TextField
          placeholder={state.state.answer}
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          margin="dense"
          value={answer}
          defaultValue={state.state.answer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAnswer(e.target.value)
          }}
        />
        <div className={classes.inputFileBtn}>
          <label htmlFor="icon-button-file">
            <Input
              id="icon-button-file"
              type="file"
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

      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity={updateColor ? "success" : "error"}
        message={updateMessage}
      />
    </>
  )
}