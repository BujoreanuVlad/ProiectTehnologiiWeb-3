class Eveniment {

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

	removeParticipant(participant) {

		let indexParticipant = this.#checkIsInList(this.#listaParticipanti, participant);

		if (indexParticipant >= 0) {
			this.#listaParticipanti.splice(indexParticipant);
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

	#checkIfEqual(obj1, obj2) {
		
		if (typeof(obj1) === 'object' || typeof(obj2) === 'object') {
			if (obj1 == obj2) {
				return true;
			}
		}
		else {
			return obj1 === obj2;
		}

		if (typeof(obj1) != 'object' || typeof(obj2) != 'object') {
			return false;
		}

		let keys1 = Object.keys(obj1)
		let keys2 = Object.keys(obj2)

		if (keys1.length !== keys2.length) {
			return false;
		}

		keys1.sort()
		keys2.sort()

		for (let i = 0; i < keys1.length; i++) {
			
			if (keys1[i] !== keys2[i]) {
				return false;
			}

			if (obj1[keys1[i]] !== obj2[keys2[i]]) {
				return false;
			}
		}

		return true;
	}

	//Function to check whether or not an object is present in an array or in the properties of the objects of an array
	#checkIsInList(list, obj) {
		
		for (let i = 0; i < list.length; i++) {

			let elem = list[i];

			//Check if object is part of the array
			if (this.#checkIfEqual(elem, obj)) {
				return i;
			}

			//If the array is made up of objects, check if your object is present in the properties of the current element
			for (let propr in elem) {
				if (this.#checkIfEqual(elem[propr], obj)) {
					return i;
				}
			}
		}

		return -1;
	}

	adaugaParticipant(participant, dataInregistrare=null) {

		if (this.#checkIsInList(this.#listaParticipanti, participant) === -1) {

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
		return JSON.stringify({"nume": this.#nume, "stare": this.#stare, "dataDeschidere": this.#dataDeschidere, "interval": this.#interval, "codAcces": this.#codAcces, "listaParticipanti": this.#listaParticipanti, "nrLocuriDisponibile": this.#nrLocuriDisponibile});
	}
}

module.exports = Eveniment;
