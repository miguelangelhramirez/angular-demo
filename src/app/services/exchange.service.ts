import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getExchangeRate(base: string, target: any[], amount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/pair/${base}/${target}/${amount}`);
  }
}