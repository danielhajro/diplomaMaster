import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarChartComponent } from './car-chart.component';

describe('CarChartComponent', () => {
  let component: CarChartComponent;
  let fixture: ComponentFixture<CarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
