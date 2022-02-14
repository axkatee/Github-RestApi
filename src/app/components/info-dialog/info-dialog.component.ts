import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { IShowInfoDialogData } from "../../interfaces/interfaces";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<IShowInfoDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IShowInfoDialogData
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
