import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {
    constructor(
        private builder: FormBuilder,
        private alert: AlertService,
        private router: Router,
        private account: AccountService,
        private authen: AuthenService
    ) {
        this.initialCreateFormData();
        // console.log(this.authen);
        // console.log(this.authen.getAuthenticated()); // เอาไว้ดูค่า token id
    }

    Url = AppURL;
    form: FormGroup;

    // เข้าสู่ระบบ
    onSubmit(): void {
        if (this.form.invalid)
            return this.alert.someting_wrong(); //แสดง Alert ว่ามีอะไรผิดพลาด
        this.account
            .onLogin(this.form.value)
            .then((res) => {
                // console.log(res);
                // ทำการเก็บ Session
                this.authen.setAuthenticated(res.accessToken);
                // ทำการ Alert และ redirect หน้า page
                this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info');
                this.router.navigate(['/', AppURL.Authen, AuthURL.Dashboard]);

            })
            .catch(err => this.alert.notify(err.Message));
            
    }

    // สร้างฟอร์ม
    private initialCreateFormData() {
        this.form = this.builder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            remember: [true]
        });
    }
}
