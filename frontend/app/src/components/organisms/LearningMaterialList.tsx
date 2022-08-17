import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
// import { Grid } from "@material-ui/core"
import { Grid } from '@mui/material';
// import { makeStyles } from "@material-ui/core/styles"
import { makeStyles, createStyles } from '@mui/styles';
import { Container } from '@mui/material';
import LearningMaterialForm from "./LearningMaterialForm"
import LearningMaterialItem from "./LearningMaterialItem"
import { WidthChanger } from "templates/WidthChanger";
import { getLearningMaterials } from "../../apis/learning_material"
import { LearningMaterial } from "../../interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

export type Props = {
  userId: number
}

// const PostList: React.FC = () => {
const LearningMaterialList: React.FC<Props> = (userId) => {
  const classes = useStyles()
  console.log(userId.userId)
  const usersId = String(userId.userId)
  console.log(usersId)
  const [checkNumberOfLms, setCheckNumverOfLms] = useState(false)
  const [learning_materials_var, setLearningMaterials] = useState<LearningMaterial[]>([])
  // const [learning_materials_var, setLearningMaterials] = useState<LearningMaterial[]>([])
  // const { usersId } = useParams();


  const handleGetLearningMaterials = async () => {

    const { data } = await getLearningMaterials(usersId)
    // setLearningMaterials(data.learning_materials)

    setLearningMaterials(data);
    console.log(data)
    console.log(data.length)
    if (data.length > 5) {
      setCheckNumverOfLms(true)
    }
    // console.log(data.learning_materials)
    console.log(learning_materials_var)
  }

  useEffect(() => {
    handleGetLearningMaterials()
  }, [])

  return (<><WidthChanger>
    <Container maxWidth="xl" className={classes.container}>
      <Grid container direction="row" justifyContent="center">
        {/* <Grid container direction="row" justifyContent="center" spacing-xs12="true"> */}
        <Grid item >



          <LearningMaterialForm
            handleGetLearningMaterials={handleGetLearningMaterials}
            userId={usersId}
            over={checkNumberOfLms}
          />
          {/* { learning_materials_var?.map((learning_material) => { */}
          {/* { learning_materials_var?.map((learning_material: LearningMaterial) => {
            return (
              

              <LearningMaterialItem
                key={learning_material.id}
                // key={index}
                learning_material={learning_material}
                handleGetLearningMaterials={handleGetLearningMaterials}
              
              />
              
            )}
          )} */}
          <h2>教材</h2>
        </Grid>
      </Grid>
    </Container>
  </WidthChanger>
    {learning_materials_var?.map((learning_material: LearningMaterial) => {
      return (

        <div id="userCard">
          <LearningMaterialItem
            key={learning_material.id}
            // key={index}
            learning_material={learning_material}
            handleGetLearningMaterials={handleGetLearningMaterials}

          />
        </div>


      )
    }
    )}
  </>
  )
}

export default LearningMaterialList