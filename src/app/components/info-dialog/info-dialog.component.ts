import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IShowInfoDialogData } from "../../interfaces/interfaces";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: []
})
export class InfoDialogComponent {

  constructor(
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IShowInfoDialogData
  ) { }

  closeDialog(): void {
    this.matDialog.closeAll();
  }
}
