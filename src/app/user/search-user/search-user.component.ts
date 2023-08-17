import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../../types/user";
import {FriendRequests} from "../../types/friendRequests";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit{
  name!: string | null;
  users: User [] | undefined;
  currentUser: User | undefined;
  friendRequest: FriendRequests | undefined;
  friendIds: any[] | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
      this.userService.searchUsers({name: this.name}).subscribe(res => {
        this.users = res
      });
      this.userService.getUser().subscribe((res) => {
        this.currentUser = res
        this.friendIds = this.currentUser?.friends.map(friend => friend._id);
      })
      this.userService.getFriendRequest().subscribe((res) => {
        this.friendRequest = res
      })
    });
  }

  makeRequest(userToId: any){
    let data = {
      user: userToId,
    }
    this.userService.sendFriendRequest(data).subscribe((res) => {
      this.friendRequest = res
    })
  }
}
