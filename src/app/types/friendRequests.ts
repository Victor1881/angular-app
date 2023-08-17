import {User} from "./user";

export interface FriendRequests{
  _id: string,
  sentTo: string[]
  owner: User
  __v: number
}
