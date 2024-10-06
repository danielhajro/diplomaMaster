import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usercrud: UserCrudsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      role: ['ADMIN'], // Default role value
      profilePic: ['utilities/photos/profile_pic.jpg'] // Default profile pic value
    });
  }

  onSubmit(): void {
    // Check if the form is invalid
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    // Log form values for debugging
    console.log('Form data:', this.registerForm.value);

    const formData: Person = {
      ...this.registerForm.value,
      role: this.registerForm.value.role || 'ADMIN', 
      profilePic: this.registerForm.value.profilePic || 'utilities/photos/profile_pic.jpg' 
    };

    this.usercrud.addPerson(formData).subscribe(
      (response) => {
        console.log('Person added successfully', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error adding person', error);
      }
    );
  }
}
