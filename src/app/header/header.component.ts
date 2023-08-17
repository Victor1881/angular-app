import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";
import {ApiService} from "../api/api.service";
import {User} from "../types/user";
import {UserService} from "../user/user.service";
import {filter} from "rxjs";
import {FriendRequests} from "../types/friendRequests";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  user: User | undefined
  friendRequests: FriendRequests [] | undefined

  constructor(private http: HttpClient,  private router: Router, public apiService: ApiService, private userService: UserService) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.fetchUser();
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.userService.getSentFriendRequest().subscribe((res) => {
        this.friendRequests = res
      })
    });
  }

  logout(){
    this.http.delete('http://localhost:3000/logout', { withCredentials: true }).subscribe(
      (response) => {
        this.router.navigate(['/login'])
        this.apiService.isAuthenticated = false
      },
      (error) => {
        console.log(error.error);
      }
    )
  }


  fetchUser(): void {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  goToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchUsersByName(name: HTMLInputElement){
    if (name.value){
      this.router.navigate([`/search-user/${name.value}`])
    }else {
      return
    }
  }

  showNotification(){
    let div = document.getElementById('notification-modal')
    if (div){
      if (div.style.display === 'block'){
        div.style.display = 'none'
      }else {
        div.style.display = 'block'
      }
    }
  }

  addUser(event: any, userId: any){
    let data = {
      friendId: userId
    }
    this.userService.addFriend(data).subscribe()
    event.target.parentNode.parentNode.remove()
  }

  ignoreUser(event: any, userId: any){
    let data = {
      friendId: userId
    }
    this.userService.ignoreFriend(data).subscribe()
    event.target.parentNode.parentNode.remove()
  }

  getUserData(userId: any){
    let data = {
      userId: userId
    }
    this.userService.getUserDataAndPosts(data).subscribe((res: any) => {
      this.userService.setUser(res.user, res.posts)
      console.log(res.user, res.posts)
      this.router.navigate([`/user-profile/${res.user.fullName}`])
    })
  }
}


