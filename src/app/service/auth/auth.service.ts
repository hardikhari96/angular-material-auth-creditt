import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userLogin, userRegister } from 'src/app/interfaces/auth.if';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http_req: HttpClient) { }

  login(data: userLogin) {
    return this.http_req.post(`${environment.base_url}/web/login`, data);
  }
  register(data: userRegister) {
    return this.http_req.post(`${environment.base_url}/web/register`, data);
  }
  refreshAccesToken(): Observable<Boolean> {
    var subject = new Subject<boolean>();
    this.http_req.get(`${environment.base_url}/web/refresh`).subscribe((res: any) => {
      if (res.success && !res.newtoken) {
        subject.next(true);
      } else if (res.success && res.newtoken) {
        localStorage.setItem('token', res.accesstoken);
        subject.next(true);
      } else {
        subject.next(false);
      }
    })
    return subject.asObservable();
  }
  logout(){
    return this.http_req.get(`${environment.base_url}/web/logout`);
  }
}
