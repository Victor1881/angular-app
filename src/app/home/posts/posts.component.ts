import { Component } from '@angular/core';
import {User} from "../../types/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiService} from "../../api/api.service";
import {UserService} from "../../user/user.service";
import {Post} from "../../types/post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  user: User | undefined
  posts: Post[] | undefined
  friendIds: any[] | undefined;

  constructor(private http: HttpClient,  private router: Router, public apiService: ApiService, private userService: UserService) {
    this.userService.getUser().subscribe(
      (user: User) => {
        if (user){
          this.user = user
          this.friendIds = this.user.friends.map(friend => friend._id);
          console.log(this.friendIds)
        }
      })

    this.userService.getAllPosts().subscribe((res: Post[]) => {
      this.posts = res
      console.log(this.posts)
    })

  }
}
