const DEFAULT_API_LOCALHOST = 'http://localhost:3001/api/v1'

interface UserType {
  id: string
}

export const usersShow = (id: Partial<UserType>): string => `${DEFAULT_API_LOCALHOST}/users/${id}`;