import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import * as Highcharts from 'highcharts';
  

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    // chartOptions: any
    weeks : number[] = [];
    startDate:any;
    WeeklyIncome:any;
    Members:any;
    MyReports:any;
    AllReports:any;
    valuesingraph:any;


    chartOptions: {}
    elsoproba: any[] = [];

    constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private cookieService: CookieService) { 
        this.elsoproba = [10, 19, 4, 1, 30, 37]
        this.chartOptions = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Weekly Reports'
            },
            xAxis: {
                categories: ['10. Week', '11. Week', '12. Week', '13. Week', '14. Week', '15. Week']
            },
            yAxis: {
                title: {
                    text: 'Amount'
                },
            },
            series: [{
                name: 'Value',
                data: [100, 105, 97, 109, 89, 110]
                // data: this.elsoproba
            }]
        };
    }
    highcharts = Highcharts;

    ngOnInit(): void {
        let sidebar = document.getElementById('sidebarcontainer')
        if (sidebar != undefined) {
            sidebar.style.display = 'block';
        }
        let content = document.getElementById('content')
        if (content != undefined) {
            content.classList.add('content')
        }
        let maincontainer = document.getElementById('content')
        if (maincontainer != undefined) {
            maincontainer.style.textAlign = 'center';
            maincontainer.style.justifyContent = 'center';
            maincontainer.style.alignItems = 'center';
        }
        
        var Token = this.cookieService.get('LoginToken')
        this.http.post<any>("http://localhost:2004/GetIndex", {Token: Token}).subscribe(datas => {
            if (datas.succes) {
                // Widgets \\
                this.WeeklyIncome = datas.stats.weeklyincome;
                this.Members = datas.stats.members;
                this.AllReports = datas.stats.allreports;
                this.MyReports = datas.stats.myreports;
                // End of Widgets \\

                // Charts \\
                this.weeks = []
                for (let i=0; i<datas.reports.length; i++) {
                    let datum = new Date(datas.reports[i].Date);
                    this.startDate = new Date(datum.getFullYear(), 0, 1);
                    var days = Math.floor((datum.getTime() - this.startDate) / (24 * 60 * 60 * 1000));
                    var weekNumber = Math.ceil((datum.getDay() + 1 + days) / 7);
                    if (this.weeks[weekNumber]) {
                        this.weeks[weekNumber] = this.weeks[weekNumber] + 1;
                    }
                    else {
                        this.weeks[weekNumber] = 1;
                    }
                }
                let values = []
                let categories = []
                let k=0;
                for (let i=0; i<this.weeks.length; i++) {
                    if (this.weeks[i]) {
                        values[k] = this.weeks[i];
                        categories[k] = i + ". Hét"
                        k++;
                    }
                }

                console.log(values)
                console.log(categories)
                // let valuesingraph = [13, 11, 4, 1, 30, 37];
                // this.elsoproba = valuesingraph
                this.chartOptions = {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Weekly Reports'
                    },
                    xAxis: {
                        // categories: ['10. Week', '11. Week', '12. Week', '13. Week', '14. Week', '15. Week']
                        categories: categories
                    },
                    yAxis: {
                        title: {
                            text: 'Amount'
                        },
                    },
                    series: [{
                        name: 'Value',
                        // data: [100, 105, 97, 109, 89, 110]
                        data: values
                    }]
                };
                // End of Charts \\
            }
            else {
                this.router.navigate(['login']);
            }
        })    
    }
}
