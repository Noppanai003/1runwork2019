import { Routes, RouterModule} from '@angular/router';
import { AppURL } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const RouteLists: Routes = [
    { path: '', redirectTo: AppURL.Login, pathMatch: 'full'}, //ตรงนี้ถ้าไม่ได้ทำอะไรมัน เราจะชี้ไปหน้า login อัตโนมัติ
    { path: AppURL.Login, component: LoginComponent },
    { path: AppURL.Register, component: RegisterComponent }, // อันไหนเราลงไว้ในนี้ มันสามารถรีหน้าได้ แต่ต้องไปกำหนดตัวชี้ให้ไปตามที่ต้องการ
    { path: AppURL.Authen, loadChildren: './authentication/authentication.module#AuthenticationModule' }
];

export const AppRouting = RouterModule.forRoot(RouteLists);