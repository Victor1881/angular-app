import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../types/user";
import {SafeUrl} from "@angular/platform-browser";
import {Post} from "../../types/post";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-page-foreign',
  templateUrl: './profile-page-foreign.component.html',
  styleUrls: ['./profile-page-foreign.component.css']
})
export class ProfilePageForeignComponent implements OnInit, OnDestroy{
  user: User | undefined
  public imageUrl!: SafeUrl;
  posts: Post [] | undefined

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.user = this.userService.user
    this.posts = this.userService.posts
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.user = this.userService.user
      this.posts = this.userService.posts
    });
  }

  ngOnDestroy() {
  }
}
