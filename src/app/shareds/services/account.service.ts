import { Injectable } from "@angular/core";
import { IRegister } from 'src/app/components/register/register.interface';
import { resolve, reject } from 'q';
import { ILogin } from 'src/app/components/login/login.interface';
@Injectable()
export class AccountService {

    //ทำการ mock ค่า เพื่อใช้งาน
    private mockUserItems: IAccount[] = [
        {
            id: 1,
            firstname: 'นพนัย',
            lastname: 'จันทร์สี',
            email: 'swordart003@gmail.com',
            password: '12345',
            position: 'Backend Developer',
            image: 'assets/images/dom-profile.jpg',
            created: new Date(),
            updated: new Date()
        },
        {
            id: 2,
            firstname: 'ปริญญา',
            lastname: 'จันดา',
            email: 'parinya@gmail.com',
            password: '12345',
            position: 'Frontend Developer',
            image: 'assets/images/man-profile.jpg',
            created: new Date(),
            updated: new Date()
        }
    ];

    // ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
    getUserLogin(accessToken: string) {
        return new Promise<IAccount>((resolve, reject) => { // บังคับใช้ <IAccount>
            const userLogin = this.mockUserItems.find(m => m.id == accessToken); // ถ้าเกิดมันเท่ากับ accessToken มันก็จะแสดงข้อมูลที่ login เข้ามา 
            if(!userLogin) return reject({ Message: 'accessToken ไม่ถูกต้อง'}); // ถ้าค่าที่ถูกส่งมาไม่ถูกไอดี ก็แจ้งเตือนแล้วทำการเด้ง
            resolve(userLogin);
        });
    }

    //เข้าสู่ระบบ
    onLogin(model: ILogin) {
        return new Promise<{ accessToken: string }>((resolve, reject) => {
            // resolve(model);
            const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password);
            // console.log(userLogin); //หาเจอแสดงค่าที่เราฟิกไว้
            if (!userLogin) return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
            resolve({
                accessToken: userLogin.id //ใช้ไอดีเชื่อม
            });
        });
    }

    // ลงทะเบียนเป็นการจำลองแบบ Promise
    onRegister(model: IRegister) { //ตัวที่กำลังพยายามทำอยู่นี่คือตัว จำลอง server
        // console.log(model);
        return new Promise((resolve, reject) => {
            model['id'] = Math.random(); this.mockUserItems.push(model);
            resolve(model); //รีโซฟคือถ้าเกิดว่ามันถูกต้องหมดทุกอย่างไม่มีผิดพลาด resolve ก็จะทำงาน 
        });
    }
}

export interface IAccount { //จำลองฐานข้อมูล
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    created?: Date;
    updated?: Date;
} 