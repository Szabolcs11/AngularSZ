import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';



@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private cookieService: CookieService) { }

    logform = new FormGroup({
        Username: new FormControl(),
        Password: new FormControl()
    })

    regform = new FormGroup({
        Username: new FormControl(),
        Email: new FormControl(),
        Password: new FormControl()
    })

    register() {
        this.http.post<any>("http://localhost:2004/Register", this.regform.value).subscribe(datas => {
            console.log(datas)
            if (datas.succes) {
                // Betölt az oldal
                const container = document.getElementById('container');
                container?.classList.remove("right-panel-active");
                this.toastr.success(datas.message, "Siker!")
            }
            else {
                this.toastr.error(datas.message, "Hiba!")
            }
        })
    }

    login() {
        this.http.post<any>("http://localhost:2004/Login", this.logform.value).subscribe(datas => {
            if (datas.succes) {
                this.cookieService.set('LoginToken', datas.token)
                this.router.navigate(['/'])
                this.toastr.success(datas.message, "Siker!")
            }
            else {
                this.toastr.error(datas.message, "Hiba!")
            }
        })
    }
    
    ngOnInit(): void {
        let sidebar = document.getElementById('sidebarcontainer')
        if (sidebar != undefined) {
            sidebar.style.display = 'none';
        }

        let content = document.getElementById('content')
        if (content != undefined) {
            content.classList.remove('content')
        }
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signInButton?.addEventListener('click', () => {
            container?.classList.remove("right-panel-active");
        });
        signUpButton?.addEventListener('click', () => {
            container?.classList.add("right-panel-active");
        });
        var Token = this.cookieService.get('LoginToken')
        this.http.post<any>("http://localhost:2004/GetLogin", {Token: Token}).subscribe(datas => {
            console.log(datas)
            if (datas.succes) {
                // Betölt az oldal
            }
            else { // Átirányítás
                this.router.navigate(['/'])
            }
        })
    }

}
