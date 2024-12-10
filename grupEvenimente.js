//const { Eveniment } = await import("./eveniment.js");
const Eveniment = require("./eveniment.js");
//import { checkIfEqual, checkIsInList } from "./utils.js";
//const { checkIfEqual, checkIsInList } = await import("./utils.js");
const { checkIfEqual, checkIsInList } = require("./utils.js");

class GrupEvenimente {

	#nume;
	#listaEvenimente;

	constructor(nume, listaEvenimente=[]) {
		
		this.#checkValidNume(nume);
		this.#nume = nume;

		this.#checkValidListaEvenimente(listaEvenimente);
		this.#listaEvenimente = listaEvenimente;
	}

	getNume() {
		return this.#nume;
	}

	setNume(nume) {
		
		this.#checkValidNume(nume)

		this.#nume = nume;
	}

	getListaEvenimente() {
		return Array.from(this.#listaEvenimente);
	}

	getNrEvenimente() {
		return this.#listaEvenimente.length
	}

	adaugaEveniment(eveniment) {

		this.#checkValidEveniment(eveniment);

		if (checkIsInList(this.#listaEvenimente, eveniment) === -1) {

			this.#listaEvenimente.push(eveniment);

			return true;
		}

		return false;
	}

	stergeEveniment(eveniment) {

		let indexEveniment = -1;

		//If eveniment is actually the index we want to erase
		if (typeof(eveniment) === 'number' || eveniment instanceof Number) {
			indexEveniment = eveniment;
			if (indexEveniment >= getNrEvenimente()) {
				indexEveniment = -1;
			}
		}
		else {

			//Otherwise find out the index of the event in our array
			this.#checkValidEveniment(eveniment);

			indexEveniment = checkIsInList(this.#listaEvenimente, eveniment);
		}

		if (indexEveniment >= 0) {
			this.#listaEvenimente.splice(indexEveniment, 1);
			return true;
		}

		return false;
	}

	removeAllEvents() {
		this.#listaEvenimente = []
	}

	#checkValidNume(nume) {

		if (!(typeof(nume) === 'string' || nume instanceof String)) {
			throw new Error("Eroare. Numele trebuie sa fie de tip string.");
		}
	}

	#checkValidEveniment(eveniment) {

		if (!(eveniment instanceof Eveniment)) {
			throw new Error("Eroare. Obiectul nu este de tip \"Eveniment\"")
		}
	}

	#checkValidListaEvenimente(listaEvenimente) {

		if (!(listaEvenimente instanceof Array)) {
			throw new Error("Eroare. Lista de evenimente trebuie sa fie de tip array.");
		}

		for (let elem of listaEvenimente) {

			if (!(elem instanceof Eveniment)) {
				throw new Error("Eroare. Lista de evenimente trebuie sa contina doar evenimente de tip \"Eveniment\"");
			}
		}
	}

	toString() {
		return JSON.stringify({"nume": this.#nume, "listaEvenimente": this.#listaEvenimente.toString()})
	}

	static fromJSON(obj) {

		let listaEvenimente = []

		if (Object.keys(obj).indexOf("listaEvenimente") >= 0) {
			listaEvenimente = obj.listaEvenimente
		}

		return new GrupEvenimente(obj.nume, listaEvenimente)
	}

}

module.exports = GrupEvenimente;
