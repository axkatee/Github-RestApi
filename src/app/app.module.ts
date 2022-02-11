import { NgModule } from '@angular/core';

import { ApiService } from "./services/api.service";
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { FormsModule } from "@angular/forms";
import { MatSortModule } from "@angular/material/sort";
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
