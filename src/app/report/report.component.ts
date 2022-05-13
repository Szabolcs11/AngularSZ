import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

	constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private cookieService: CookieService) {}

	selectedFile:any;
	// selectedFile?:File;


	reportform = new FormGroup({
        TargetName: new FormControl(),
        Price: new FormControl(),
        Img: new FormControl(),
        Other: new FormControl()
    })

	public onImgSelected(event: Event): void {
		const target = event.target;
		if (target instanceof HTMLInputElement && target.files?.length === 1) {
		  this.selectedFile = target.files[0];
		}
		// throw new Error(`gfd`);
	  }

	submitreport() {
		const fd = new FormData();
		fd.append('image', this.selectedFile)
		fd.append('datas', JSON.stringify(this.reportform.value))
		var Token = this.cookieService.get('LoginToken')
		fd.append('token', JSON.stringify(Token));
		console.log(fd)
		this.http.post<any>("http://localhost:2004/Reports", fd).subscribe(datas => {
			console.log(datas)
			if (datas.succes) {
				this.toastr.success(datas.message, 'Succes!')
			}
			else {
				if (datas.Token) {
					this.cookieService.delete('LoginToken')
					this.router.navigate(['/login']);
				}
				this.toastr.error(datas.message, 'Error!')
			}
		})
	}

	ngOnInit(): void {
		let maincontainer = document.getElementById('content')
        if (maincontainer != undefined) {
            maincontainer.style.textAlign = 'center';
            maincontainer.style.justifyContent = 'center';
            maincontainer.style.alignItems = 'center';
        }
		
		document.getElementsByClassName('active')[0].classList.remove('active')
		document.getElementById('Report')?.classList.add('active')
		document.getElementById("titletext")!.innerHTML = "Report"

		var Token = this.cookieService.get('LoginToken')
        this.http.post<any>("http://localhost:2004/GetReports", {Token: Token}).subscribe(datas => {
            if (datas.succes) {
				
			}
			else {
				this.router.navigate(['login']);
			}
		})
	}

}
