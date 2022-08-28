import React, { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import DeleteIcon from "@material-ui/icons/Delete"
import CreateIcon from '@mui/icons-material/Create';
import LyricsIcon from '@mui/icons-material/Lyrics';
import MoreVertIcon from "@material-ui/icons/MoreVert"
import AndroidIcon from '@mui/icons-material/Android';
import { makeStyles, createStyles } from '@mui/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Steps, Hints } from "intro.js-react"
import 'intro.js/introjs.css';

import { LearningMaterial } from "../../interfaces/index"
import { deleteLearningMaterials } from "../../apis/learning_material"
import { WSF_stock } from "../atoms/wavesurfer/wavesurfer"
import { AuthContext } from "../../App"
import { Update } from "../pages/Update"
import AlertMessage from "../molecules/AlertMessage"


const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    marginTop: "2rem",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)"
    }
  },
  delete: {
    marginLeft: "auto"
  }
}))

interface LearningMaterialItemProps {
  learning_material: LearningMaterial
  handleGetLearningMaterials: Function
}


const LearningMaterialItem = ({ learning_material, handleGetLearningMaterials }: LearningMaterialItemProps) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [deleteMessage, setDeleteMessage] = useState<string>("")
  const [deleteColor, setDeleteColor] = useState<boolean>(true)
  const classes = useStyles()
  const [like, setLike] = useState<boolean>(false)
  const usersId = String(currentUser?.id);
  const [enabled, setEnabled] = useState(false)
  const [initialStep, setInitialStep] = useState(0)

  const onExit = () => {
    setEnabled(false)
  }
  const steps = [
    {
      element: '#play',
      intro: '勉強ページに移動します。',
      position: 'bottom',
    },
    {
      element: '#update',
      intro: '保存した音声を編集できます。',
      position: 'bottom',
    },
    {
      element: '#delete',
      intro: '保存した音声を削除できます。',
      position: 'bottom',
    },
  ];


  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const HandleDeleteLearningMaterial = async (id: string) => {

    await deleteLearningMaterials(usersId, id)
      .then((e) => {
        setTimeout(() => {
          handleGetLearningMaterials()
        }, 2000);
        console.log(e)
        setDeleteMessage("削除に成功しました")
        setDeleteColor(true)
        setAlertMessageOpen(true)
      })
      .catch(error => {

        setTimeout(() => {
          handleGetLearningMaterials()
        }, 2000);
        setDeleteMessage("エラーが発生しました")
        setDeleteColor(false)
        setAlertMessageOpen(true)
      });
  }
  { console.log(learning_material.file) }
  return (
    <>

      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
      />
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar>
              {<AndroidIcon />}
            </Avatar>
          }
          action={
            <IconButton onClick={() => { setEnabled(true) }}>
              <QuestionMarkIcon />
              <h6>詳細</h6>
            </IconButton>
          }
          title={currentUser?.name}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            {learning_material.subject.split("\n").map((subject: string, index: number) => {
              console.log(learning_material)

              return (
                <>
                  <div key={index}>
                    <p>{subject}</p>
                    <p>{learning_material.body}</p>
                  </div>

                </>
              )
            })
            }

          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => like ? setLike(false) : setLike(true)}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>


          <div className={classes.delete}>
            <Link to={`/learningMaterial/${learning_material.id}`} state={{ state: learning_material }}>
              <IconButton id="play">
                <LyricsIcon />play
              </IconButton>
            </Link>
            <Link to={`/learningMaterial/${learning_material.id}/update`} state={{ state: learning_material }}>
              <IconButton id="update">
                <CreateIcon />update
              </IconButton>
            </Link>

            <IconButton
              onClick={() => HandleDeleteLearningMaterial(learning_material.id)}
              id="delete"
            >
              <DeleteIcon color="primary" />delete
            </IconButton>
          </div>
        </CardActions>
      </Card>

      <Routes>
        <Route path="learningMaterial/:learningMaterialId" element={<WSF_stock file={learning_material.file} />} />
        <Route path="learningMaterial/:learningMaterialId/update" element={<Update />} />
      </Routes>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity={deleteColor ? "success" : "error"}
        message={deleteMessage}
      />
    </>
  )
}

export default LearningMaterialItem