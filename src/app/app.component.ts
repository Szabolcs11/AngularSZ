import { Component } from '@angular/core';
// import * as Highcharts from 'highcharts';
// Chart \\

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Index\\
  WeeklyIncome:any;
  Members:any;
  MyReports:any;
  AllReports:any;

  // ReportList \\
  ReportListData:any;
  
  title = 'project';

  // Profile \\
  Userdatas:any
  ProfileImgSrc?:string;
}
