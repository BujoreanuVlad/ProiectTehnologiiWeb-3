//import { checkIfEqual, checkIsInList } from "./utils.js";
const { checkIfEqual, checkIsInList } = await import("./utils.js");
const { Participant } = await import("./participant.js");

export class Eveniment {

	#nume;
	#dataDeschidere;
	#interval;
	#nrLocuriDisponibile;
	#codAcces;
	#stare;
	#listaParticipanti;

	constructor(nume, dataDeschidere, interval, nrLocuriDisponibile, codAcces=null, stare="CLOSED", listaParticipanti=[]) {
		
		this.#checkValidNume(nume);
		this.#nume = nume;

		this.#checkValidDataDeschidere(dataDeschidere);
		this.#dataDeschidere = dataDeschidere;

		this.#checkValidInterval(interval);
		this.#interval = interval;

		this.#checkValidNrLocuri(nrLocuriDisponibile);
		this.#nrLocuriDisponibile = nrLocuriDisponibile;
		
		if (codAcces === null) {
			this.#codAcces = this.#genCodAcces();
		}
		else {
			this.#checkValidCodAcces(codAcces);
			this.#codAcces = codAcces;
		}

		this.#checkValidStare(stare);
		this.#stare = stare;

		this.#checkValidListaParticipanti(listaParticipanti);
		this.#listaParticipanti = listaParticipanti;
	}

	#genCodAcces(length=6) {

		let codAcces = '';

		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;

		for (let i = 0; i < length; i++) {
		  codAcces += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return codAcces;
	}

	getNume() {
		return this.#nume;
	}

	setNume(nume) {
		this.#checkValidNume(nume);
		this.#nume = nume;
	}

	getStare() {
		return this.#stare;
	}

	getDataDeschidere() {
		return this.#dataDeschidere;
	}

	setDataDeschidere(dataDeschidere) {

		this.#checkValidDataDeschidere(dataDeschidere);
		this.#dataDeschidere = dataDeschidere;
	}

	getInterval() {
		return this.#interval;
	}

	setInterval(interval) {
		this.#checkValidInterval(interval);
		this.#interval = interval;
	}

	getCodAcces() {
		return this.#codAcces;
	}

	setCodAcces(cod) {

		if (typeof(cod) === 'string' || cod instanceof String) {
			this.#checkValidCodAcces(cod);
			this.#codAcces = cod;
		}
		else if (typeof(cod) === 'number' || cod instanceof Number) {
			this.#codAcces = this.#genCodAcces(cod);
		}
	}

	getNrParticipanti() {
		return this.#listaParticipanti.length;
	}

	stergeParticipant(participant) {

		let indexParticipant = checkIsInList(this.#listaParticipanti, participant);

		if (indexParticipant >= 0) {
			this.#listaParticipanti.splice(indexParticipant, 1);
			return true;
		}

		return false;
	}

	removeAllParticipants() {
		this.#listaParticipanti = []
	}

	getListaParticipanti() {
		return Array.from(this.#listaParticipanti);
	}

	getNrLocuriDisponibile() {
		return this.#nrLocuriDisponibile;
	}

	setNrLocuriDisponibile(nrLocuriDisponibile) {
		this.#checkValidNrLocuri(nrLocuriDisponibile);
		this.#nrLocuriDisponibile = nrLocuriDisponibile;
	}

	adaugaParticipant(participant, dataInregistrare=null) {

		this.#checkValidParticipant(participant);

		if (checkIsInList(this.#listaParticipanti, participant) === -1) {

			if (dataInregistrare === null) {
				dataInregistrare = new Date();
			}

			this.#listaParticipanti.push({"participant": participant, "dataInregistrare": dataInregistrare});

			return true;
		}

		return false;
	}

	deschideEveniment() {
		this.#stare = "OPEN"
	}

	inchideEveniment() {
		this.#stare = "CLOSED";
	}

	getDataInchidere() {
		return new Date(this.#dataDeschidere.getTime() + this.#interval*60_000);
	}

	#checkValidNume(nume) {

		if (!(typeof(nume) === 'string' || nume instanceof String)) {
			throw new Error("Eroare. Numele trebuie sa fie de tip string.");
		}
	}

	#checkValidDataDeschidere(dataDeschidere) {

		if (!(dataDeschidere instanceof Date)) {
			throw new Error("Eroare. Data deschiderii trebuie sa fie de tip Date");
		}
	}

	#checkValidInterval(interval) {

		if (!(typeof(interval) === 'number' || interval instanceof Number)) {
			throw new Error("Eroare. Intervalul de timp trebuie sa fie un numar.")
		}

		if (interval <= 0) {
			throw new Error("Eroare. Intervalul de timp nu poate fi mai mic decat 1 minut.")
		}
	}

	#checkValidNrLocuri(nrLocuri) {

		if (!(typeof(nrLocuri) === 'number' || nrLocuri instanceof Number)) {
			throw new Error("Eroare. Numarul de locuri trebuie sa fie un numar.")
		}
		if (!Number.isInteger(nrLocuri)) {
			throw new Error("Eroare. Numarul de locuri sa fie un numar intreg.")
		}
		if (nrLocuri <= 0) {
			throw new Error("Eroare. Numarul de locuri nu poate fi mai mic decat 1.")
		}
	}

	#checkValidCodAcces(codAcces) {

		if (!(typeof(codAcces) === 'string' || codAcces instanceof String)) {
			throw new Error("Eroare. Codul de acces trebuie sa fie de tip string.");
		}
	}

	#checkValidStare(stare) {

		if (stare !== "OPEN" && stare != "CLOSED") {
			throw new Error("Eroare. Starea evenimentului nu poate fi decat \"OPEN\" sau \"CLOSED\"");
		}
	}

	#checkValidListaParticipanti(listaParticipanti) {

		if (!(listaParticipanti instanceof Array)) {
			throw new Error("Eroare. Lista de participanti trebuie sa fie de tip array.");
		}
	}

	toString() {
		return JSON.stringify({"nume": this.#nume, "stare": this.#stare, "dataDeschidere": this.#dataDeschidere, "interval": this.#interval, "codAcces": this.#codAcces, "listaParticipanti": this.#listaParticipanti.map((obj) => {obj['participant'] = obj['participant'].toString(); return obj}), "nrLocuriDisponibile": this.#nrLocuriDisponibile});
	}

	static equals(ev1, ev2) {
		
		if (ev1.#nume !== ev2.#nume) {
			return false;
		}

		if (!checkIfEqual(ev1.#dataDeschidere, ev2.#dataDeschidere)) {
			return false;
		}

		if (ev1.#interval !== ev2.#interval) {
			return false;
		}

		if (ev1.#nrLocuriDisponibile !== ev2.#nrLocuriDisponibile) {
			return false;
		}

		if (ev1.#codAcces !== ev2.#codAcces) {
			return false;
		}

		if (ev1.getNrParticipanti() !== ev2.getNrParticipanti()) {
			return false;
		}

		for (let i = 0; i < ev1.#listaParticipanti.length; i++) {
			if (!checkIfEqual(ev1.#listaParticipanti[i], ev2.#listaParticipanti[i])) {
				return false;
			}
		}

		return true;
	}

	#checkValidParticipant(p) {
		
		if (!(p instanceof Participant)) {
			throw new Error("Eroare. Participant invalid.");
		}
	}

	equals(otherEvent) {
		return Eveniment.equals(this, otherEvent);
	}
}

//module.exports = Eveniment;
