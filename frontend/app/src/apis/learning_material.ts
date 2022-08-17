import { AxiosPromise } from "axios"
import { useParams } from "react-router-dom";


import client_lm from "./client_lm"
import { LearningMaterialApiJson } from "../interfaces/index"
import { error } from "console";

// 取得
export const getLearningMaterials = (usersId: string | undefined) => {
  return client_lm.get(`${usersId}/learning_materials`)
}
// export const getLearningMaterials = (usersId: string|undefined): AxiosPromise<LearningMaterialApiJson> => {
//   return client_lm.get(`${usersId}/learning_materials`)
// }

// 作成
export const createLearningMaterials = (usersId: string | undefined, data: FormData): AxiosPromise => {
  return client_lm.post(`${usersId}/learning_materials`, data)
}

// 削除
export const deleteLearningMaterials = (usersId: string | undefined, id: string): AxiosPromise => {
  return client_lm.delete(`${usersId}/learning_materials/${id}`)
}

// 編集
export const updateLearningMaterials = (usersId: string | undefined, id: string, data: FormData): AxiosPromise => {
  return client_lm.patch(`${usersId}/learning_materials/${id}`, data)
}