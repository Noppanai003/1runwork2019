import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class AuthenService {
    //ความจำเครื่อง
    private accessKey = 'accessToken';

    // กำหนดค่า access token ไว้ในความจำ browser
    setAuthenticated(accessToken: string) { //ฟังก์ชัน Set ความจำ
        localStorage.setItem(this.accessKey, accessToken); //เก็บ accessToken ไว้
    }

    // จะหายก็ต่อเมื่อ
    // ดึงค่า access token ในความจำ browser ออกมา
    getAuthenticated(): string {
        return localStorage.getItem(this.accessKey); // การกำหนดคีย์เบื้องต้น โดย Return ออกมาเป็น String
    }

    // ล้างค่า access token ที่อยู่ความจำ browser
    clearAuthenticated(): void {
        localStorage.removeItem(this.accessKey);
    }
}