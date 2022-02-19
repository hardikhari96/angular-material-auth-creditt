import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { confirmatinDialog } from 'src/app/interfaces/dialogs.if';

@Component({
  selector: 'app-conformation',
  templateUrl: './conformation.component.html',
  styleUrls: ['./conformation.component.scss']
})
export class ConformationComponent implements OnInit {
  buttonone:string ="";
  buttontwo:string ="";
  message:string=""
  constructor(@Inject(MAT_DIALOG_DATA) public data: confirmatinDialog,public dialogRef: MatDialogRef<any>,) {
    this.message = data.message;
    this.buttonone = data.buttonone;
    this.buttontwo = data.buttontwo;
  }

  ngOnInit(): void {
  }
  choose(status:boolean){
    this.dialogRef.close(status);
  }

}
