import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AppSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }


  public closeDialog(): void {
    this.dialogRef.close();
  }

  public setTheme(theme: string): void {
    this.dialogRef.close({theme: theme});
  }

}