import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmarksComponent } from './checkmarks.component';

describe('CheckmarksComponent', () => {
  let component: CheckmarksComponent;
  let fixture: ComponentFixture<CheckmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
