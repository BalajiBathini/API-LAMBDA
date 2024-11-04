// src/app/components/data-form/data-form.component.ts

import { Component } from '@angular/core';
import { JsonDataService } from '../../json-data.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  jsonData = { name: '', age: null };
  response: any;

  constructor(private jsonDataService: JsonDataService) {}

  submitData() {
    this.jsonDataService.storeJsonData(this.jsonData).subscribe(
      (data) => {
        this.response = data;
        alert('Data successfully stored in S3!');
      },
      (error) => {
        console.error('Error storing data:', error);
      }
    );
  }
}
