import {Component, ElementRef, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../user/user.service";
import {User} from "../../../types/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RightSidebarComponent implements OnInit{
  user: User | undefined

  constructor(private userService: UserService, private renderer: Renderer2, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserFriends().subscribe((res) => {
      this.user = res
    })
  }

  openChat(event: any, friend: User){
    let div = document.createElement('div')
    if (div){
      div.className = 'chat-box'


      div.innerHTML = `
      <div class="chat-header">
       <img class="user__avatar" src=${friend.image}/>
        <span class="chat-name">${friend.fullName}</span>
        <span class="chat-status">Online</span>
        <button class="chat-close">X</button> </div>
      <div class="chat-body">
        <div class="chat-message chat-message-left">
          <p>message</p>
        </div> <div class="chat-message chat-message-right">
        <p>k?</p>
      </div>
      </div>
      <div class="chat-footer">
        <input type="text" class="chat-input" placeholder="Type a message…">
        <button class="chat-send">Send</button>
      </div>`

      let chatBoxes = Array.from(document.querySelectorAll('span[class="chat-name"]'))

      if (chatBoxes.find(box => box.textContent === friend.fullName)){
        console.log(event.target)
        return
      }
      else {
        if (chatBoxes.length === 4){
          return
        }
        document?.querySelector('body')?.appendChild(div)
      }
    }

    this.renderer.listen(div.querySelector('button[class="chat-close"]'), 'click', (event) => {
      event.target.parentElement.parentElement.remove()
    })

    this.renderer.listen(div.querySelector('button[class="chat-send"]'), 'click', (event) => {
      console.log(event.target.parentElement.querySelector('input').value)
    })

    this.renderer.listen(div.querySelector('img'), 'click', (event) => {
      this.router.navigate([`/user-profile/${friend.fullName}`])
    })
  }
}

