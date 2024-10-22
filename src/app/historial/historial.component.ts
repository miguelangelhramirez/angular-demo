import { Component } from '@angular/core';
import { IViaje } from '../models/viaje.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {

  viajesList: any[] = [];

  constructor(private _apiService: ApiService) {

  }

  ngOnInit(): void {
    this._apiService.getViajes().subscribe(data => {
      this.viajesList = data;
    })   
  }

}
