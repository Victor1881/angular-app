import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../types/user";
import {Observable, Subject} from "rxjs";
import {Post} from "../types/post";
import {FriendRequests} from "../types/friendRequests";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User;
  posts: Post[] = [];
  userChanged = new Subject<User>();
  postsChanged = new Subject<Post[]>();


  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return this.http.get<User>('http://localhost:3000/get-user', { withCredentials: true })
  }

  getUserPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('http://localhost:3000/user-posts', { withCredentials: true })
  }

  changeUserCoverPage(file: string) {
    let fileData = { file: file };
    return this.http.post<User>('http://localhost:3000/change-cover-page', fileData, { withCredentials: true })
  }

  sendPost(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post('http://localhost:3000/send-post', data, { headers, withCredentials: true })
  }

  searchUsers(data: any): Observable<User[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<User[]>('http://localhost:3000/search-users', data, { headers, withCredentials: true })
  }

  sendFriendRequest(data: any): Observable<FriendRequests>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<FriendRequests>('http://localhost:3000/sent-friend-request', data, { headers, withCredentials: true })
  }

  getFriendRequest(): Observable<FriendRequests>{
    return this.http.get<FriendRequests>('http://localhost:3000/get-friend-request', { withCredentials: true })
  }

  getSentFriendRequest(): Observable<FriendRequests[]>{
    return this.http.get<FriendRequests[]>('http://localhost:3000/get-user-sent-request', { withCredentials: true })
  }

  addFriend(data: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post('http://localhost:3000/add-user', data, { headers, withCredentials: true })
  }

  ignoreFriend(data: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post('http://localhost:3000/ignore-user', data, { headers, withCredentials: true })
  }

  getUserFriends(): Observable<User>{
    return this.http.get<User>('http://localhost:3000/get-user-friends', { withCredentials: true })
  }

  getUserDataAndPosts(data: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post('http://localhost:3000/get-user-data', data, { headers, withCredentials: true })
  }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('http://localhost:3000/get-all-posts', { withCredentials: true })
  }

  setUser(user: User, posts: Post[]){
    this.user = user
    this.userChanged.next(this.user)
    this.posts = posts
    this.postsChanged.next(this.posts)
  }

  editUserPost(data: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.put('http://localhost:3000/edit-user-post', data, { headers, withCredentials: true })
  }

  deleteUser(){
    return this.http.delete('http://localhost:3000/delete-user-profile', { withCredentials: true })
  }
}

