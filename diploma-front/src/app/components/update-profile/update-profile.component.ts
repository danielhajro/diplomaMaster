import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCrudsService } from 'src/app/services/user-cruds.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  person: any;
  updatePersonForm: FormGroup;

  constructor(
    private userCrud: UserCrudsService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.updatePersonForm = this.fb.group({
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

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      this.loadUserInfo(person_id);
    } else {
      console.error('Person ID not found. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  loadUserInfo(person_id: number): void {
    this.userCrud.getPersonInfo(person_id).subscribe(
      person => {
        this.person = person;
        this.updatePersonForm.patchValue({
          name: person.name,
          surname: person.surname,
          dob: person.dob,
          email: person.email,
          number: person.number,
          address: person.address,
          state: person.state,
          password: person.password,
          role: person.role,
          profilePic: person.profilePic
        })
      }, 
      error => {
        console.error('Error loading user info:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.updatePersonForm.valid) {
      const formUpdate = this.updatePersonForm.value;
      const person_id = this.authService.getPersonId();

      if (person_id) {
        this.userCrud.updatePerson(person_id, formUpdate).subscribe(
          response => {
            console.log('Profile updated successfully:', response);
            this.router.navigate(['/user-dashboard']);
          }, 
          error => {
            console.error('Error updating profile:', error);
          }
        );
      } else {
        console.error('Person ID not found.');
      }
    } else {
      console.error('Form is invalid');
    }
  }

  deleteProfile(person_id:number):void{
    this.userCrud.deleteUser(person_id).subscribe(
      response=>{
        return console.log("Success Deleted: ", response);
      },error=>{
        return console.error("Cant delete user: ", error);
      }
    )
  }
}
