import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	weeks : number[] = [];
	startDate:any;

	MyReportsOption: {}
	MyWageOptions: {}

  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.MyReportsOption = {
        chart: {
            type: 'column'
          },
          title: {
            text: 'Weekly Reports'
          },
          xAxis: {
            type: 'category',
            labels: {
              style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Amount'
            }
          },
          legend: {
            enabled: false
          },
          series: [{
            name: 'Reports',
            data: [
              ['11. Week', 24],
              ['12. Week', 15],
              ['13. Week', 27],
            ]
          }]
    };
	this.MyWageOptions = {
		chart: {
            type: 'column'
          },
          title: {
            text: 'Weekly Wage From Reports'
          },
          xAxis: {
            type: 'category',
            labels: {
              style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Amount'
            }
          },
          legend: {
            enabled: false
          },
          series: [{
            name: 'Wage From Reports',
            data: [
              ['11. Week', 24],
              ['12. Week', 15],
              ['13. Week', 27],
            ]
          }]
	}
  }

  Userdatas:any
  ProfileImgSrc?:string;

  MyReportsHighcharts = Highcharts;

  MyWageHighcharts = Highcharts;

    ngOnInit(): void {
        document.getElementsByClassName('active')[0].classList.remove('active')
        document.getElementById('Profile')?.classList.add('active')
        document.getElementById("titletext")!.innerHTML = "Profile"

        let maincontainer = document.getElementById('content')
        if (maincontainer != undefined) {
            maincontainer.style.textAlign = 'left';
            maincontainer.style.justifyContent = 'flex-start';
            maincontainer.style.alignItems = 'stretch';
        }

        var Token = this.cookieService.get('LoginToken')
        this.http.post<any>("http://localhost:2004/GetProfile", {Token: Token}).subscribe(datas => {
            if (datas.succes) {
                // console.log(datas)
			}
			else {
				this.router.navigate(['login']);
			}
            // console.log(datas)
            this.Userdatas = datas.userdatas[0];
            console.log(this.Userdatas)
            this.ProfileImgSrc = "http://localhost:2004/Images/" + datas.userdatas[0].ProfilePic


			// Chartok \\
			this.weeks = []
                for (let i=0; i<datas.reportdatas.length; i++) {
                    let datum = new Date(datas.reportdatas[i].Date);
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
				// console.log(this.weeks)
                let values = []
                let categories = []
				let merged: any[][] = [];
                let k=0;
                for (let i=0; i<this.weeks.length; i++) {
                    if (this.weeks[i]) {
                        values[k] = this.weeks[i];
                        categories[k] = i + ". Hét"
						merged[k] = [];
						merged[k][0] = i + ". Hét"
						merged[k][1] = this.weeks[i];
						
						k++;
                    }
                }

            // console.log(values)
            // console.log(categories)
            // console.log(merged)
			k =0;
			let wagemerged: any[][] = [];
			this.weeks = []
			for (let i=0; i<datas.reportdatas.length; i++) {
				let datum = new Date(datas.reportdatas[i].Date);
				let price = datas.reportdatas[i].Price
				this.startDate = new Date(datum.getFullYear(), 0, 1);
				var days = Math.floor((datum.getTime() - this.startDate) / (24 * 60 * 60 * 1000));
				var weekNumber = Math.ceil((datum.getDay() + 1 + days) / 7);

				if (this.weeks[weekNumber]) {
					this.weeks[weekNumber] = this.weeks[weekNumber] + price;
				}
				else {
					this.weeks[weekNumber] = price;
				}
			}

			// console.log(this.weeks)

			for (let i=0; i<this.weeks.length; i++) {
				if (this.weeks[i]) {
					wagemerged[k] = [];
					wagemerged[k][0] = i + ". Hét"
					wagemerged[k][1] = this.weeks[i];
					
					k++;
				}
			}
			// console.log(wagemerged)

			this.MyReportsOption = {
				chart: {
					type: 'column'
				  },
				  title: {
					text: 'Weekly Reports'
				  },
				  xAxis: {
					type: 'category',
					labels: {
					  style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					  }
					}
				  },
				  yAxis: {
					min: 0,
					title: {
					  text: 'Amount'
					}
				  },
				  legend: {
					enabled: false
				  },
				  series: [{
					name: 'Reports',
					data: merged
				  }]
			};

			this.MyWageOptions = {
				chart: {
					type: 'column'
				  },
				  title: {
					text: 'Weekly Wage From Reports'
				  },
				  xAxis: {
					type: 'category',
					labels: {
					  style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					  }
					}
				  },
				  yAxis: {
					min: 0,
					title: {
					  text: 'Amount'
					}
				  },
				  legend: {
					enabled: false
				  },
				  series: [{
					name: 'Wage From Reports',
					data: wagemerged
				  }]
			}
		})
    }

}
