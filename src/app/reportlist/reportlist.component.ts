import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-reportlist',
	templateUrl: './reportlist.component.html',
	// styleUrls: ['./reportlist.component.css']
	styleUrls: ['./reportlist.component.scss']
})
export class ReportlistComponent implements OnInit {

	constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private cookieService: CookieService) { }

	ReportListData:any;


	ngOnInit(): void {
		let maincontainer = document.getElementById('content')
        if (maincontainer != undefined) {
            maincontainer.style.textAlign = 'center';
            maincontainer.style.justifyContent = 'center';
            maincontainer.style.alignItems = 'center';
        }
		
		document.getElementsByClassName('active')[0].classList.remove('active')
    	document.getElementById('Reports')?.classList.add('active')
		document.getElementById("titletext")!.innerHTML = "AllReport"

		this.ReportListData = [
			[1, 2, 3, 4],
			[2, 3, 4, 5],
			[3, 4, 5, 6]
		]
		var Token = this.cookieService.get('LoginToken')

		this.http.post<any>("http://localhost:2004/GetAllReports", {Token: Token}).subscribe(datas => {
			if (datas.succes) {
				// Betölt az oldal
				console.log(datas)
				for (let i=0; i<datas.reportdatas.length; i++) {
					let datum = new Date(datas.reportdatas[i].Date)
					datas.reportdatas[i].Date = datum.toISOString().slice(0, 10)
				}
				this.ReportListData = datas.reportdatas
			}
			else { // Átirányítás
				this.router.navigate(['/login'])
			}
		})
	}

	CloseModal() {
		document.getElementById('modal')?.classList.add('mvanish')
	}

	ShowImage(URL:string) {
		console.log(URL)
		document.getElementById('modal')?.classList.remove('mvanish')
		document.getElementById('ModalPic')?.setAttribute('src', "http://localhost:2004/Images/" + URL);
		// document.getElementById('modal')?.src = "http://localhost:2004/Images/" + URL;
	}
}

