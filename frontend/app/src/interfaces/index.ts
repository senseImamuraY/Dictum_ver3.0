// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

export interface LearningMaterial {
  id: string
  subject: string
  body: string
  file?: {
    url: string
  }
  answer?: string | undefined
}

export interface LearningMaterialApiJson {
  learning_materials: LearningMaterial[]
  // learning_materials: []
}