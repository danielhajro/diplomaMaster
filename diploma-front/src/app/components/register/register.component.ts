import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserCrudsService } from '../../services/user-cruds.service';
import { Person } from 'src/app/interfaces/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usercrud: UserCrudsService,
    private router:Router)
    { }

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
      role: ['', [Validators.required]], 
      profilePic: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const formData: Person = {
      ...this.registerForm.value,
      role: this.registerForm.value.role || 'User', 
      profilePic: this.registerForm.value.profilePic || 'utilities/photos/profile_pic.jpg' 
    };

    this.usercrud.addPerson(formData).subscribe(response => {
      console.log('Person added successfully', response);
      this.router.navigate(['/login']);
    }, error => {
      console.error('Error adding person', error);
    });
  }
}
