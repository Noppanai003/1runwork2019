import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL} from '../../../authentication/authentication.url';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-auth-navbar',
    templateUrl: './auth-navbar.component.html',
    styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {
    constructor(
        private router: Router,
        private authen: AuthenService,
        private alert: AlertService
    ) { }

    ngOnInit() {
    }

    AppURL = AppURL;
    AuthURL = AuthURL;

    // ออกจากระบบ
    onLogout(){
        // console.log('logout'); //เรียกดูค่า ว่ามันเรียกใช้งานมั้ย
        this.alert.notify('ออกจากระบบสำเร็จ', 'info'); // แจ้งเตือน 'info' คือแถบแจ้งเตือนสีฟ้า
        this.authen.clearAuthenticated(); // เคลียร์ค่าทิ้ง
        this.router.navigate(['/', AppURL.Login]); //เมื่อมีการคลิกออกจากระบบ ก็จะวิ่งไปที่หน้า Login
    }

}
