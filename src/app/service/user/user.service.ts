import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { updateUser, userChildrenAdd, userChildrenListFetch } from 'src/app/interfaces/user.if';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http_req: HttpClient) { }
  fetchUserList(data: any) {
    return this.http_req.post(`${environment.base_url}/web/user/list`, data);
  }
  deleteUser(id: number) {
    return this.http_req.get(`${environment.base_url}/web/user/delete/${id}`);
  }
  addChildren(data: userChildrenAdd) {
    return this.http_req.post(`${environment.base_url}/web/user/children/add`, data);
  }
  fetchChildrenList(data: userChildrenListFetch) {
    return this.http_req.post(`${environment.base_url}/web/user/children/list`, data);
  }
  removeChildren(data: any) {
    return this.http_req.post(`${environment.base_url}/web/user/children/delete`, data);
  }
  updateUser(data: updateUser) {
    return this.http_req.post(`${environment.base_url}/web/user/update`, data);
  }
  userDetail(id: number) {
    return this.http_req.get(`${environment.base_url}/web/user/details/${id}`);
  }
  updateChildren(data: any) { }
}
