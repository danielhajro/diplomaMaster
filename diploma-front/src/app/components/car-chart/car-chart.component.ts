import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cars } from 'src/app/interfaces/cars';
import { AuthService } from 'src/app/services/auth.service';
import { CarCrudService } from 'src/app/services/car-crud.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';
import { Color, ScaleType } from '@swimlane/ngx-charts'; // Import Color and ScaleType

@Component({
  selector: 'app-car-chart',
  templateUrl: './car-chart.component.html',
  styleUrls: ['./car-chart.component.css']
})
export class CarChartComponent implements OnInit {
  carData: Cars[] = [];
  chartData: any[] = [];
  xAxisLabel: string = 'Attribute';
  yAxisLabel: string = 'Count';
  selectedAttribute: keyof Cars = 'make'; // Default attribute
  attributes: (keyof Cars)[] = ['make', 'year', 'fuel', 'price', 'hp', 'gear'];

  // Properly define the color scheme object
  colorScheme: Color = {
    name: 'myScheme', // Custom scheme name
    selectable: true,
    group: ScaleType.Ordinal, // Set the scale type
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private carCrud: CarCrudService,
    private userCrud: UserCrudsService
  ) { }

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id !== null) {
      this.userCrud.getRole(person_id).subscribe(
        (roleResponse: string) => {
          const person_role = roleResponse.trim();
          if (person_role === 'ADMIN') {
            this.onAttributeChange(this.selectedAttribute); // Load default attribute graph on init
          } else {
            console.warn('Access denied. User is not an admin:');
            this.router.navigate(['/login']);
          }
        });
    } else {
      console.error("Person Id not Found");
      this.router.navigate(['/login']);
    }
  }

  // Fetch and transform data based on selected attribute
  onAttributeChange(attribute: keyof Cars): void {
    this.xAxisLabel = attribute.charAt(0).toUpperCase() + attribute.slice(1);

    this.carCrud.getAllCars().subscribe((data: Cars[]) => {
      this.chartData = this.transformData(data, attribute);
    });
  }

  // Transform data to fit the chart structure
  transformData(data: Cars[], attribute: keyof Cars): any[] {
    const result = data.reduce((acc, car) => {
      const key = car[attribute]?.toString(); // Convert the attribute value to string and handle undefined
      if (key) { // Check if key is defined and not an empty string
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number }); // Define the accumulator type

    return Object.keys(result).map(key => ({
      name: key,
      value: result[key]
    }));
  }
}
