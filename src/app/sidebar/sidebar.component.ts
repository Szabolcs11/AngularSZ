import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private cookieService: CookieService) { }

    Home() {
        this.router.navigate(['/'])
        let element = document.getElementsByClassName('activec')[0] || document.getElementsByClassName('active')[0]
        element.classList.remove('active')
        // element.classList.remove('activec')

        document.getElementById("titletext")!.innerHTML = "Home"
        document.getElementById('Home')?.classList.add('active')
    }

    Report() {
        this.router.navigate(['report'])
        let element = document.getElementsByClassName('activec')[0] || document.getElementsByClassName('active')[0]
        element.classList.remove('active')
        // element.classList.remove('activec')

        document.getElementById("titletext")!.innerHTML = "Report"
        document.getElementById('Report')?.classList.add('active')
    }

    Reports() {
        this.router.navigate(['reports'])
        let element = document.getElementsByClassName('activec')[0] || document.getElementsByClassName('active')[0]
        element.classList.remove('active')
        // element.classList.remove('activec')

        document.getElementById("titletext")!.innerHTML = "AllReport"
        document.getElementById('Reports')?.classList.add('active')
    }

    Profile() {
        this.router.navigate(['profile'])
        let element = document.getElementsByClassName('activec')[0] || document.getElementsByClassName('active')[0]
        element.classList.remove('active')
        // element.classList.remove('activec')

        document.getElementById("titletext")!.innerHTML = "Profile"
        document.getElementById('Profile')?.classList.add('active')
    }

    SignOut() {
        //Logout
        let logintoken = this.cookieService.get('LoginToken')
        this.http.post<any>("http://localhost:2004/SingOut", {Token: logintoken}).subscribe(datas => {
            this.router.navigate(['login'])
            this.toastr.success(datas.message, "Siker!")
            this.cookieService.delete('LoginToken')
        })
    }
    

    ngOnInit(): void {

    }

}
