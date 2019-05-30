import { IAccount } from '../../services/account.service';

export interface IAuthSidebarComponent{
    AppURL: any;
    AuthURL: any; //อยากให้มีอะไรหน้า AuthSidebarComponent บ้างบังคับใส่ตรงนี้
    UserLogin: IAccount;

}