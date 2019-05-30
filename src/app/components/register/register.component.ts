import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IRegisterComponent } from './register.interface';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { Router } from '@angular/router';
declare let $;
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
    constructor(
        private builder: FormBuilder,
        private alert: AlertService,
        private account: AccountService,
        private router: Router
    ) {
        this.initialCreateFormData();
    }

    Url = AppURL;
    form: FormGroup;

    //ลงทะเบียน
    onSubmit() {
        if (this.form.invalid)
            return this.alert.someting_wrong();
        // ส่งข้อมูลหา Server  
        this.account
            .onRegister(this.form.value) //จะส่ง value เข้าไป
            .then(res => {
                this.alert.notify('ลงทะเบียนสำเร็จ', 'info');
                this.router.navigate(['/' , AppURL.Login]);
            }) // ถ้าเข้าเงื่อนไข Sucsess ใช้ตัวนี้ ก็แสดงค่า console.log ออกมา
            .catch(err => this.alert.notify(err.Message)); //ถ้าติด error ก็ทำ notify ออกมาว่า error เพราะอะไร;
    }

    //สร้างฟอร์ม
    private initialCreateFormData() {

        this.form = this.builder.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{5,15}$/)]],
            cpassword: ['', [Validators.required, this.comparePassword('password')]]
        });
    }

    // สร้าง Validate เอง
    private comparePassword(passwordField: string){
        return function (confirm_password: AbstractControl){
            if (!confirm_password.parent) return; //ตรงนี้จะวิ่งวนหา parent ถ้าหาไม่เจอก็จะ Return ออกไป
            const password = confirm_password.parent.get(passwordField);
            const passwordSubscribe = password.valueChanges.subscribe(() => { //เช็คว่าค่ามีการเปลี่ยนแปลงหรือไม่ ถ้ามีก็อย่าให้มันโกง
                confirm_password.updateValueAndValidity();
                passwordSubscribe.unsubscribe();
            });
            if (confirm_password.value === password.value) //เช็คว่ามันตรงกันจริงๆ
            return;
            return { compare : true };
        }
    }
}
