import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IViaje, ViajesResponse } from "../models/viaje.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api'

  constructor(private _httpClient: HttpClient) {

  }

  public getViajes(): Observable<IViaje[]> {
    return this._httpClient.get<ViajesResponse>(`${this.baseUrl}/viajes`).pipe(
      map(response => response.data)
    );
  }

  public agregarViaje(viaje: IViaje): Observable<IViaje> {
    return this._httpClient.post<IViaje>(`${this.baseUrl}/viajes/store`, viaje);
  }
  
  public getPaises(): Observable<any[]> {
    return this._httpClient.get<any>(`${this.baseUrl}/paises`).pipe(
      map(response => response.data)
    );
  }

  public getCitiesByCountry(country: string): Observable<any[]> {
    return this._httpClient.get<any>(`${this.baseUrl}/ciudades/${country}`).pipe(
      map(response => response.data)
    );
  }

  public getCurrencyByCountry(country: string): Observable<any[]> {
    return this._httpClient.get<any>(`${this.baseUrl}/moneda/${country}`).pipe(
      map(response => response.data.moneda)
    );
  }
}
