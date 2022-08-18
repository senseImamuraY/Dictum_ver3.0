import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Grid } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Container } from '@mui/material';
import LearningMaterialForm from "./LearningMaterialForm"
import LearningMaterialItem from "./LearningMaterialItem"
import { WidthChanger } from "../../templates/WidthChanger";
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


const LearningMaterialList: React.FC<Props> = (userId) => {
  const classes = useStyles()
  console.log(userId.userId)
  const usersId = String(userId.userId)
  console.log(usersId)
  const [checkNumberOfLms, setCheckNumverOfLms] = useState(false)
  const [learning_materials_var, setLearningMaterials] = useState<LearningMaterial[]>([])

  const handleGetLearningMaterials = async () => {

    const { data } = await getLearningMaterials(usersId)

    setLearningMaterials(data);
    console.log(data)
    console.log(data.length)
    if (data.length > 5) {
      setCheckNumverOfLms(true)
    }
    console.log(learning_materials_var)
  }

  useEffect(() => {
    handleGetLearningMaterials()
  }, [])

  return (<><WidthChanger>
    <Container maxWidth="xl" className={classes.container}>
      <Grid container direction="row" justifyContent="center">
        <Grid item >
          <LearningMaterialForm
            handleGetLearningMaterials={handleGetLearningMaterials}
            userId={usersId}
            over={checkNumberOfLms}
          />
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