import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userCrud: UserCrudsService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      this.authService.loginUser(loginData).subscribe(
        (response) => {
          const person_id = this.authService.getPersonId(); // Assuming you have a method to get person_id
          if (person_id !== null) {
            this.userCrud.getRole(person_id).subscribe(
              (roleResponse: string) => {
                const person_role = roleResponse.trim(); // Trim in case there are extra spaces
                if (person_role === 'ADMIN') {
                  console.log('Admin logged in successfully:', loginData);
                  this.router.navigate(['/admin-dashboard']);
                } else {
                  console.warn('Access denied. User is not an admin:', loginData);
                  this.errorMessage = 'Access denied. You do not have permission to access this page.';
                }
              },
              (error) => {
                console.error('Error fetching user role:', error);
                this.errorMessage = 'Error fetching user role. Please try again.';
              }
            );
          } else {
            this.errorMessage = 'Person ID not found. Please try again.';
          }
        },
        (error) => {
          console.error('Error logging in User:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );
    }
  }
  
}
