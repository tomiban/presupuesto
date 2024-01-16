import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { PresupuestoService } from "../../../services/presupuesto.service"

@Component({
	selector: "app-ingresar-gasto",
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: "./ingresar-gasto.component.html",
	styleUrl: "./ingresar-gasto.component.css",
})
export class IngresarGastoComponent {
	nombreGasto: string
	cantidad: number
	formularioIncorrecto: boolean
	textIncorrecto: string

	constructor(private _presupuestoService: PresupuestoService) {
		this.nombreGasto = ""
		this.cantidad = 0
		this.formularioIncorrecto = false
		this.textIncorrecto = ""
	}

	agregarGasto(): void {
		if (this.nombreGasto == "" || this.cantidad <= 0) {
			this.formularioIncorrecto = true
			this.textIncorrecto = "Nombre gasto o cantidad incorrecta"
			return
		}

		if (this.cantidad > this._presupuestoService.restante) {
			this.formularioIncorrecto = true
			this.textIncorrecto = "El monto supera a la cantidad de dinero restante"
			return
		}

    const GASTO = {
      nombre: this.nombreGasto,
      cantidad: this.cantidad
    }

		this._presupuestoService.sumarGasto(GASTO)
		//Creamos obj

		//enviamos obj a los suscriptores via subject

		this.formularioIncorrecto = false
		this.cantidad = 0
		this.nombreGasto = ""
	}
}
