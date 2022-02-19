import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/dialog/conformation/conformation.component';
import { confirmatinDialog } from 'src/app/interfaces/dialogs.if';
import { UserService } from 'src/app/service/user/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-childrens',
  templateUrl: './edit-childrens.component.html',
  styleUrls: ['./edit-childrens.component.scss']
})
export class EditChildrensComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private dialog: MatDialog, private userService: UserService) { }
  @Input()
  get userid(): number { return this._userid; }
  set userid(userid: number) {
    this._userid = userid;
  }
  private _userid = 0;
  rows: FormArray = this.formbuilder.array([]);

  datasource: any = new BehaviorSubject<AbortController[]>([]);
  displayedColumns = ['id', 'name', 'age', 'add', 'delete'];
  childrensFormGroup = this.formbuilder.group({
    childrens: this.rows
  });

  ngOnInit(): void {
    console.log(this.userid);
    this.fetchChildrens();
  }
  get childrens() {
    return this.childrensFormGroup.controls["childrens"] as FormArray;
  }
  addChildren(index: number) {
    console.log(this.childrens.at(index).value)
    if (this.childrensFormGroup.valid) {
      this.userService.addChildren({
        ...this.childrens.at(index).value,
        userid: this.userid
      }).subscribe((res: any) => {
        console.log(res);
        const children = this.formbuilder.group({
          id: new FormControl(res.data.id,),
          name: new FormControl(res.data.name, [Validators.required]),
          age: new FormControl(res.data.age, Validators.required)
        })
        this.childrens.at(index).setValue({
          id: res.data.id,
          name: res.data.name,
          age: res.data.age
        });
        this.addNewform();
      });
    }
  }
  addNewform(data = { id: "", name: "", age: "" }) {
    const children = this.formbuilder.group({
      id: new FormControl(data.id, []),
      name: new FormControl(data.name, [Validators.required],),
      age: new FormControl(data.age, Validators.required)
    })
   this.childrens.disable({onlySelf:true});
    this.childrens.push(children);
    this.updateTable();
  }
  removeChildren(index: number) {
    console.log(this.childrens.at(index).value, "jjj")
    var data: confirmatinDialog = {
      buttonone: "Remove Children",
      buttontwo: "Cancel",
      message: "Do you want to Remove this children :" + (index + 1)
    }
    var dialogref = this.dialog.open(ConformationComponent, {
      data: data
    })
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.removeChildren({
          id: this.childrens.at(index).value.id,
          userid: this.userid
        }).subscribe((res: any) => {
          if (res.success) {
            this.childrens.removeAt(index);
            this.updateTable();
          }
        });
      }
    })
  }
  fetchChildrens() {
    this.userService.fetchChildrenList({ userid: this.userid }).subscribe((res: any) => {
      if (res.success) {
        if (res.data.length > 0) res.data.forEach((element: any) => {
          this.addNewform(element);
        });
        this.updateTable();
      }
      this.addNewform();
    });
  }
  updateTable() {
    this.datasource.next(this.rows.controls);
  }

}
