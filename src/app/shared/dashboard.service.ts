import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { NgForm } from '@angular/forms';
import { login, Manager } from './manager.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url: string = environment.apiURL+'/OfficeInfo'
  userUrl: string = 'https://localhost:7019/api/Auth/login'
  records: Manager[]=[]
  newData: Manager = new Manager()
  loginData: login[]=[]
  constructor(private http : HttpClient) { }

  postUserInfo(loginData: login) {
    const loginUrl = `${this.userUrl}?username=${loginData.username}&password=${loginData.password}`;
    return this.http.post<login[]>(loginUrl,loginData);
  }

  registerUser(user: { username: string; password: string }): Observable<any> {
    return this.http.post('https://localhost:7019/api/Auth/register', user);
  }
  
  

  getList(){
    this.http.get(this.url)
    .subscribe({
      next: res =>{
        console.log(res);
        this.records = res as Manager[]
      },
      error : err =>{console.log(err)}
    })
  }
  postData(){
    return this.http.post(this.url,this.newData)
  }
  putData(){
    return this.http.put(this.url+ '/'+this.newData.id,this.newData)
  }
  deleteData(id:number){
    return this.http.delete(this.url+ '/'+id)

  }
  reset(studentForm : NgForm){
    studentForm.form.reset()
    this.newData = new Manager()

  }
}
