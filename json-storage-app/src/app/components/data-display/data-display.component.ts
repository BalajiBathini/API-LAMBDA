// src/app/components/data-display/data-display.component.ts

import { Component, OnInit } from '@angular/core';
import { JsonDataService } from '../../json-data.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
  jsonDataArray: any[] = [];

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.jsonDataService.getAllJsonData().subscribe(
      (data) => {
        this.jsonDataArray = data;
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }
}
