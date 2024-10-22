import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IViaje } from '../models/viaje.model';
import Swal from 'sweetalert2';
import { ExchangeService } from '../services/exchange.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-3',
  templateUrl: './pantalla-3.component.html',
  styleUrls: ['./pantalla-3.component.css']
})
export class Pantalla3Component {

  formularioViaje: FormGroup
  paisDestino: string = '';
  ciudadDestino: string = '';
  dataCurrency: any[] = [];
  presupuesto: number = 0;
  rates: any = {};
  baseCurrency: string = 'COP';
  exchangeRate: number | null = null;

  constructor( private form: FormBuilder, private _apiService: ApiService, private exchangeService: ExchangeService, private router: Router) {

    this.formularioViaje = this.form.group({
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      presupuesto: ['', [Validators.required, Validators.min(1)]]
    })

    this.formularioViaje.get('pais')?.disable()
    this.formularioViaje.get('ciudad')?.disable()
    this.formularioViaje.get('presupuesto')?.disable()

  }

  ngOnInit() {
    this.formularioViaje.patchValue({
      pais: localStorage.getItem('paisDestino') || '',
      ciudad: localStorage.getItem('ciudadDestino') || '',
      presupuesto: Number(localStorage.getItem('presupuesto')) || 0
    })
    
    this._apiService.getCurrencyByCountry(this.formularioViaje.get('pais')?.value).subscribe(data => {
      this.dataCurrency = data;
      this.getExchangeRates();
    })
  }

  hasErrors( controlName: string, errorType: string ) {
    return this.formularioViaje.get(controlName)?.hasError(errorType) && this.formularioViaje.get(controlName)?.touched
  }

  guardar() {
    this.formularioViaje.get('pais')?.enable();
    this.formularioViaje.get('ciudad')?.enable();
    this.formularioViaje.get('presupuesto')?.enable();
    if (this.formularioViaje.valid) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}/${month}/${day}`;
      let nuevoViaje: IViaje = this.formularioViaje.value;
      nuevoViaje.fecha = formattedDate;

      this._apiService.agregarViaje(nuevoViaje).subscribe({
        next: (res) => Swal.fire({
          title: "Correcto",
          text: "Datos almacenados exitosamente",
          icon: "success",
          allowOutsideClick: false
        }).then((result) => {
          localStorage.clear();
          if (result.value) {
            this.router.navigateByUrl('/');
          }}),
        error: (err) => Swal.fire({
          title: "Error",
          text: "Error al guardar los datos",
          icon: "error"
        })
      })
    }
  }

  getExchangeRates(): void {
    this.exchangeService.getExchangeRate(this.baseCurrency, this.dataCurrency, this.formularioViaje.get('presupuesto')?.value).subscribe({
      next: (res) => {
        this.rates = res.conversion_result;
      },
      error:(err) => {
        console.error('Error al obtener las tasas de cambio', err);
      }
    });
  }

}
