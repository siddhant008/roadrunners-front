import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f', {static:false}) signupForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
  onSubmit(){
    console.log(this.signupForm);
  }
}