import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserCrudsService } from '../../services/user-cruds.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private usercrud: UserCrudsService,
    private router: Router,
    private authService : AuthService
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
        () => {
          console.log('User logged in successfully:', loginData);
          this.router.navigate(['/user-dashboard']);
        },
        (error) => {
          console.error('Error logging in User:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );
    }
  }
}
