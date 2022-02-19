import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formgroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required,]),
    name: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  })
  IsResMessage:boolean =true;
  resMessage:string ="";
  constructor(private authService: AuthService,private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) => {

    return this.formgroup.controls[controlName].hasError(errorName);

  }
  registerUser() {
    console.log("inregister")
    if (this.formgroup.valid) {
      this.authService.register(this.formgroup.value).subscribe((res: any) => {
        console.log(res,"resss");
        if (res.success) {
          this._snackBar.open(res.message, "ok");

          this.formgroup.reset();
        } else {
          this._snackBar.open(res.message, "ok");
        }
      })
    }else{
      this._snackBar.open("Invalid Inputs","ok");
    }
  }

}
