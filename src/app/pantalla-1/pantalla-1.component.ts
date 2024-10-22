import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pantalla-1',
  templateUrl: './pantalla-1.component.html',
  styleUrls: ['./pantalla-1.component.css']
})
export class Pantalla1Component {

  formularioDestino: FormGroup
  paisesList: any[] = [];
  ciudades: any[] = [];
  selectedCountry: string = '';
  selectedCity: string = '';

  constructor( private form: FormBuilder, private router: Router, private _apiService: ApiService ) {
    this.formularioDestino = this.form.group({
      pais: ['', Validators.required],
      ciudad: ['', Validators.required]
    })
  }

  hasErrors( controlName: string, errorType: string ) {
    return this.formularioDestino.get(controlName)?.hasError(errorType) && this.formularioDestino.get(controlName)?.touched
  }

  ngOnInit() {
    this.formularioDestino.patchValue({
      pais: localStorage.getItem('paisDestino') || '',
      ciudad: localStorage.getItem('ciudadDestino') || ''
    })
    const paisDestino = localStorage.getItem('paisDestino');
    if(paisDestino) {
      this._apiService.getCitiesByCountry(paisDestino).subscribe( data => {
        this.ciudades = data;
      });   
    }
    this._apiService.getPaises().subscribe(data => {
      this.paisesList = data;
    })
  }

  onCountryChange() {
    this.formularioDestino.get('ciudad')?.setValue('');
    if (this.formularioDestino.get('pais')?.value) {
      this._apiService.getCitiesByCountry(this.formularioDestino.get('pais')?.value).subscribe( data => {
        this.ciudades = data;
      });
    }
  }

  guardar() {
    if (this.formularioDestino.valid) {
      const formData = this.formularioDestino.value;
      localStorage.setItem('paisDestino', formData.pais);
      localStorage.setItem('ciudadDestino', formData.ciudad);
      this.router.navigate(['/pantalla-2']);
    } else {
      this.formularioDestino.markAllAsTouched();
    }
  }

}
