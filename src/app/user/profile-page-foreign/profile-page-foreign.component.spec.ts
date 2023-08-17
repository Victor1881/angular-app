import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageForeignComponent } from './profile-page-foreign.component';

describe('ProfilePageForeignComponent', () => {
  let component: ProfilePageForeignComponent;
  let fixture: ComponentFixture<ProfilePageForeignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePageForeignComponent]
    });
    fixture = TestBed.createComponent(ProfilePageForeignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
