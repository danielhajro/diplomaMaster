import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrethNeshComponent } from './rreth-nesh.component';

describe('RrethNeshComponent', () => {
  let component: RrethNeshComponent;
  let fixture: ComponentFixture<RrethNeshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrethNeshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrethNeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
