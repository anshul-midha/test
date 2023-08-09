import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(public fb: FormBuilder,
    public test: TestService) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConf: ['', [Validators.required]]
    })
  }

  signup(): void {
    this.test.signup(this.signupForm.value).subscribe((data: any) => {
      if (data.message) {
        alert(data.message);
      }
    });
  }

}
