import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formgroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required,])
  })
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.formgroup.controls[controlName].hasError(errorName);
  }
  loginUser(): void {
    console.log(this.formgroup.valid);
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard'])
    } else if (this.formgroup.valid) {
      this.authService.login(this.formgroup.value).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem("user", JSON.stringify(res.userdata));
          this.router.navigate(['/dashboard']);
        } else {
          this._snackBar.open(res.message, "ok")
        }
      })
    }
  }
}
