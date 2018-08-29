import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-test-settings-bottom-sheet',
  templateUrl: './test-settings-bottom-sheet.component.html',
  styleUrls: ['./test-settings-bottom-sheet.component.scss']
})
export class TestSettingsBottomSheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<TestSettingsBottomSheetComponent>) {
  }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
