import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pantalla1Component } from './pantalla-1/pantalla-1.component';
import { Pantalla2Component } from './pantalla-2/pantalla-2.component';
import { Pantalla3Component } from './pantalla-3/pantalla-3.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  {path: "", component: Pantalla1Component},
  {path: "pantalla-1", component: Pantalla1Component},
  {path: "pantalla-2", component: Pantalla2Component},
  {path: "pantalla-3", component: Pantalla3Component},
  {path: "historial", component: HistorialComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
