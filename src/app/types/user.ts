export interface User{
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  fullName: string
  birthday: string,
  friends: User[],
  image: string[],
  coverPhoto: string,
  password: string,
  __v: number
}

