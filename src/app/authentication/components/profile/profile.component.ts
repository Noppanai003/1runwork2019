import { Component, OnInit } from '@angular/core';
import { IProfileComponent } from './profile.interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
    constructor() { }

    positionItems: any[] = [
        'ผู้ดูแลระบบบัญชีผู้ใช้',
        'ผู้ดูแลระบบจัดการรายได้'
    ];

}
