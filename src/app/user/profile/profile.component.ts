import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../types/user";
import {UserService} from "../user.service";
import {SafeUrl} from "@angular/platform-browser";
import {Post} from "../../types/post";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User | undefined
  public imageUrl!: SafeUrl;
  posts: Post [] | undefined
  postId: any

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: User) => {
      this.user = user
    }, (error) => {
      console.log(error.error)
    })

    this.userService.getUserPosts().subscribe((res) => {
      this.posts = res
    })
  }


  getUserCoverPage(event: Event) {
    if (event.target) {
      let input = event.target as HTMLInputElement;
      if (input.files) {
        let file = input?.files[0];
        let reader = new FileReader ();

        reader.onload = (e) => {
          let dataUrl = reader.result;

            if (typeof dataUrl === "string") {
              this.userService.changeUserCoverPage(dataUrl).subscribe((res) => {
                if (this.user) {
                  this.user.coverPhoto = res.coverPhoto;
                }
                this.user ? this.user.coverPhoto = res.coverPhoto : null
              })
              window.location.reload()
            }
        };
        reader.readAsDataURL (file);
      }
    }
  }

  openModal(){
    const modal= document.getElementById('myModal')
    const backdropList = document.querySelectorAll<HTMLElement>('div[class="modal-backdrop"]')
    if (modal && backdropList){
      modal.style.display = 'block'
      modal.querySelector('button[class="btn btn-danger"]')!.textContent = 'Send'
      Array.from(backdropList).forEach(backdrop => {
        backdrop.style.display = 'block'
      })
    }
  }

  closeModal(){
    const modal = document.getElementById('myModal')
    const backdropList = document.querySelectorAll<HTMLElement>('div[class="modal-backdrop"]')
    let div = document.getElementsByClassName('container')[0]
    let input = modal!.querySelector('input[id="message"]') as HTMLInputElement
    if (modal && backdropList && div){
      modal.style.display = 'none'
      modal.querySelector('h4[class="modal-title"]')!.textContent = 'Create post'
      input.value = ''
      Array.from(backdropList).forEach(backdrop => {
        backdrop.style.display = 'none'
      })
      let img = div.children[0] as HTMLInputElement
      if (img){
        img.src = ''
      }
    }
  }

  getPostData(f?: HTMLInputElement, message?: any){
    const modal= document.getElementById('myModal')!
    let div = document.getElementsByClassName('container')[0]
    let img = div!.children[0] as HTMLInputElement
    let data = {
      message: message.value,
      dataUrl: '',
      postId: ''
    }
    console.log(img.src)
    img.src && img.src != 'http://localhost:4200/' ? data.dataUrl = img.src : data.dataUrl = ''
    if (f?.files && f.files.length > 0){
      let file = f?.files[0];
      let reader = new FileReader ();

      reader.onload = (e) => {
        let dataUrl = reader.result
        if (typeof dataUrl === "string") {
          data.dataUrl = dataUrl
          this.checkPost(modal, data)
          window.location.reload()
        }
      }
      reader.readAsDataURL (file);
    }else {
      this.checkPost(modal, data)
      window.location.reload()
    }
  }

  checkPost(modal: any, data: any){
    if (modal.querySelector('button[class="btn btn-danger"]')!.textContent === 'Edit'){
      data.postId = this.postId
      this.postId = ''
      this.userService.editUserPost(data).subscribe()
    }else {
      this.userService.sendPost(data).subscribe()
    }
  }

  showPictureInModal(event: Event){
    if (event.target) {
      let input = event.target as HTMLInputElement;
      if (input.files) {
        let file = input?.files[0];
        let reader = new FileReader ();

        reader.onload = (e) => {
          let dataUrl = reader.result;

          if (typeof dataUrl === "string") {
            let div = document.getElementsByClassName('container')[0]
            if (div){
              let img = div.children[0] as HTMLInputElement
              if (img){
                  img.src = dataUrl
              }
            }
          }
        };
        reader.readAsDataURL (file);
      }
    }
  }

  editPost(post: Post){
    this.openEditModal(post)
  }

  openEditModal(post: Post){
    const modal= document.getElementById('myModal')
    const backdropList = document.querySelectorAll<HTMLElement>('div[class="modal-backdrop"]')
    let div = document.getElementsByClassName('container')[0]
    let input = modal!.querySelector('input[id="message"]') as HTMLInputElement
    let img = div!.children[0] as HTMLInputElement
    if (modal && backdropList && img){
      modal.querySelector('h4[class="modal-title"]')!.textContent = 'Edit Post'
      modal.querySelector('button[class="btn btn-danger"]')!.textContent = 'Edit'
      input.value = post.post
      img.src = post.image
      this.postId = post._id
      modal.style.display = 'block'
      Array.from(backdropList).forEach(backdrop => {
        backdrop.style.display = 'block'
      })
    }
  }

  removeImage(){
    let div = document.getElementsByClassName('container')[0]
    let input = document.querySelectorAll('input[type="file"]')[1] as HTMLInputElement
    input.value = ''
    let img = div!.children[0] as HTMLInputElement
    img.src = ''
  }

  deleteProfile(){
    this.userService.deleteUser().subscribe( () => {
      window.location.reload()
      this.router.navigate(['/'])
    })
  }
}
