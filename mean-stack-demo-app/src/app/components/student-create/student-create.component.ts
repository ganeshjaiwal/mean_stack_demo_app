import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})

export class StudentCreateComponent implements OnInit {
  submitted = false;
  studentForm: FormGroup;
  StudentProfile:any = ['Javascript', 'Node.js', 'CSS', 'Python', 'GO Lang'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.studentForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.studentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.studentForm.valid) {
      return false;
    } else {
      this.apiService.createStudent(this.studentForm.value).subscribe(
        (res) => {
          console.log('Student successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
