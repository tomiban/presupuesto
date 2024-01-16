import { Component, OnDestroy, OnInit } from "@angular/core"
import { PresupuestoService } from "../../../services/presupuesto.service"
import { Subscription } from "rxjs"
import { CommonModule } from "@angular/common"

@Component({
	selector: "app-listar-gasto",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./listar-gasto.component.html",
	styleUrl: "./listar-gasto.component.css",
})
export class ListarGastoComponent implements OnDestroy, OnInit {
	subscription: Subscription
	presupuesto: number
	restante: number
	listGastos: Array<any> = []

	constructor(private _presupuestoService: PresupuestoService) {
		this.subscription = this._presupuestoService
			.getGastos()
			.subscribe((data) => {
				this.listGastos.push(data)
				this.restarDinero(data.cantidad)
			})
		this.restante = 0
		this.presupuesto = 0
	}
	ngOnInit(): void {
		this.presupuesto = this._presupuestoService.presupuesto
		this.restante = this._presupuestoService.restante
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}

	restarDinero(gasto: any) {
		this.restante -= gasto
	}

	eliminar(e: any) {
		let item = this.listGastos.findIndex((gasto) => gasto.nombre == e)
    this.restante += this.listGastos[item].cantidad
    this.listGastos.splice(item, 1)
	}

	aplicarColorRestante() {
		if (this.presupuesto / 4 > this.restante) {
			return "alert alert-danger"
		} else if (this.presupuesto / 2 > this.restante) {
			return "alert alert-warning"
		} else {
			return "alert alert-secondary"
		}
	}
}
