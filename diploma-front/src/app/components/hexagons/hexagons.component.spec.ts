import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexagonsComponent } from './hexagons.component';

describe('HexagonsComponent', () => {
  let component: HexagonsComponent;
  let fixture: ComponentFixture<HexagonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HexagonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexagonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
