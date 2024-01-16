import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { PresupuestoService } from "../../services/presupuesto.service"
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
	selector: "app-ingresar-presupuesto",
	standalone: true,
	imports: [FormsModule],
	templateUrl: "./ingresar-presupuesto.component.html",
	styleUrl: "./ingresar-presupuesto.component.css",
})
export class IngresarPresupuestoComponent {
	cantidad: number
	cantidadIncorrecta: boolean

	constructor(
		private _presupuestoService: PresupuestoService,
		private _router: Router
	) {
		this.cantidad = 0
		this.cantidadIncorrecta = false
	}

	agregar() {
		if (this.cantidad <= 0) {
      this.cantidadIncorrecta = true
      return
		}
		this.cantidadIncorrecta = false
    this._presupuestoService.presupuesto = this.cantidad
    this._presupuestoService.restante = this.cantidad
    this._router.navigate(['/gastos'])
	}
}
