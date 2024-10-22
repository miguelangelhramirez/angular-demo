import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-2',
  templateUrl: './pantalla-2.component.html',
  styleUrls: ['./pantalla-2.component.css']
})
export class Pantalla2Component {

  formPresupuesto: FormGroup

  constructor( private form: FormBuilder, private router: Router ) {

    this.formPresupuesto = this.form.group({
      presupuesto: ['', [Validators.required, Validators.min(1)]]
    })
    
  }

  ngOnInit() {
    this.formPresupuesto.patchValue({
      presupuesto: Number(localStorage.getItem('presupuesto')) || 0
    })
  }

  hasErrors( controlName: string, errorType: string ) {
    return this.formPresupuesto.get(controlName)?.hasError(errorType) && this.formPresupuesto.get(controlName)?.touched
  }

  guardar() {
    if (this.formPresupuesto.valid) {
      const formData = this.formPresupuesto.value;
      localStorage.setItem('presupuesto', formData.presupuesto);
      this.router.navigate(['/pantalla-3']);
    } else {
      this.formPresupuesto.markAllAsTouched();
    }
  }

}
