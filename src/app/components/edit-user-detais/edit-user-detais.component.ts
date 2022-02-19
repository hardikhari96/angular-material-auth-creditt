import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user/user.service';
@Component({
  selector: 'app-edit-user-detais',
  templateUrl: './edit-user-detais.component.html',
  styleUrls: ['./edit-user-detais.component.scss']
})
export class EditUserDetaisComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private dialog: MatDialog, private snackbar: MatSnackBar, private userService: UserService) { }
  @Input()
  get userid(): number { return this._userid; }
  set userid(userid: number) {
    this._userid = userid;
  }
  private _userid = 0;
  userDetailForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    mobile: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required])
  })
  contentstatus: boolean = false;
  ngOnInit(): void {
    this.fetchUserDetail()
  }
  fetchUserDetail() {
    //this.userDetailForm.disable({ onlySelf: true });
    this.userService.userDetail(this.userid).subscribe((res: any) => {
      console.log(res.data)
      if (res.success) {
        this.userDetailForm = new FormGroup({
          name: new FormControl(res.data.name, [Validators.required]),
          gender: new FormControl(res.data.gender, [Validators.required]),
          email: new FormControl(res.data.email, [Validators.email, Validators.required]),
          mobile: new FormControl(res.data.mobile_no, [Validators.required]),
          role: new FormControl(res.data.role + "", [Validators.required])
        })
        this.contentstatus = true;
      }

    })
  }
  updateUser() {
    console.log(this.userDetailForm.valid);
    console.log(this.userDetailForm.value);
    if (this.userDetailForm.valid) {
      this.userService.updateUser({ ...this.userDetailForm.value, userid: this.userid }).subscribe((res: any) => {
        if (res.success) {

        }
        this.snackbar.open(res.message, 'ok');
      })
    }

  }

}
