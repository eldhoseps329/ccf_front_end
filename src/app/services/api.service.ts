import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userData:Object={};
  constructor(private http:HttpClient) {
    environment.baseUrl
    this.userData=(localStorage.getItem("userData"))?JSON.parse(localStorage.getItem("userData")):{};
   }
 
   public post<T>(url: string,parameters:Object): Observable<T> {
     parameters["token"]=(this.userData["token"])?this.userData["token"]:null;
    return this.http.post<T>(`${environment.baseUrl}${url}`, parameters);
   }
   public get<T>(url: string,parameters:any): Observable<T> {
    parameters["token"]=(this.userData["token"])?this.userData["token"]:null;
   return this.http.get<T>(`${environment.baseUrl}${url}`,{params: parameters});
  }
}
