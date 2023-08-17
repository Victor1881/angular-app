import {User} from "./user";

export interface Post{
  _id: string,
  post: string,
  image: string,
  comments: string[]
  owner: User
  __v: number
}
