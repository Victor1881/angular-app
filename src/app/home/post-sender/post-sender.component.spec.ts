import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSenderComponent } from './post-sender.component';

describe('PostSenderComponent', () => {
  let component: PostSenderComponent;
  let fixture: ComponentFixture<PostSenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSenderComponent]
    });
    fixture = TestBed.createComponent(PostSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
