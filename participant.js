class Participant {

	#nume;
	#prenume;
	#nrTelefon;
	#email;
	#dataNastere;
	#username;
	#password;

	constructor(nume, prenume, nrTelefon, email, dataNastere, username, parola) {
		
		this.#checkValidNume(nume);
		this.#nume = nume;

		this.#checkValidNume(prenume);
		this.#prenume = prenume;

		this.#checkValidTelefon(nrTelefon);
		this.#nrTelefon = nrTelefon;

		this.#checkValidEmail(email);
		this.#email = email;

		this.#checkValidDataNastere(dataNastere);
		this.#dataNastere = dataNastere;

		this.#checkValidUsername(username);
		this.#username = username;

		this.#checkValidPassword(parola);
		this.#password = parola;
	}

	getNume() {
		return this.#nume;
	}

	setNume(nume) {
		
		this.#checkValidNume(nume)
		this.#nume = nume
	}

	getPrenume() {
		return this.#prenume;
	}

	setPrenume(prenume) {
		this.#checkValidNume(prenume);
		this.#prenume = prenume
	}

	getTelefon() {
		return this.#nrTelefon
	}

	setTelefon(telefon) {
		this.#checkValidTelefon(telefon);
		this.#nrTelefon = telefon;
	}

	getEmail() {
		return this.#email;
	}

	setEmail(email) {
		this.#checkValidEmail(email);
		this.#email = email;
	}

	getDataNastere() {
		return this.#dataNastere;
	}

	setDataNastere(dataNastere) {
		this.#checkValidDataNastere(dataNastere)
		this.#dataNastere = dataNastere
	}

	getUsername() {
		return this.#username;
	}

	setUsername(username) {
		this.#checkValidUsername(username);
		this.#username = username;
	}

	getPassword() {
		return this.#password;
	}

	setPassword(password) {
		this.#checkValidPassword(password)
		this.#password = password
	}

	getVarsta() {
		return (new Date() - this.#dataNastere).getUTCFullYear() - 1970
	}

	#checkValidNume(nume) {

		if (!(typeof(nume) === 'string' || nume instanceof String)) {
			throw new Error("Eroare. Numele trebuie sa fie de tip string.");
		}

		let regexNume = /^[a-zA-Z][a-zA-Z\-]+[a-zA-Z]$/

		if (nume.search(regexNume) === -1) {
			throw new Error("Eroare. Nume invalid.");
		}
	}

	#checkValidDataNastere(dataNastere) {

		if (!(dataNastere instanceof Date)) {
			throw new Error("Eroare. Data nasterii trebuie sa fie de tip Date");
		}

		if (dataNastere >= new Date()) {
			throw new Error("Eroare. Data nasterii trebuie sa fie mai mica decat data actuala");
		}
	}

	#checkValidTelefon(telefon) {

		if (!(typeof(telefon) === 'string' || telefon instanceof String)) {
			throw new Error("Eroare. Numarul de telefon trebuie sa fie de tip string.");
		}

		let regexTelefon = /^\d\d\d\d\d\d\d\d\d\d$/

		if (telefon.search(regexTelefon) === -1) {
			throw new Error("Eroare. Numar de telefon invalid");
		}
	}

	#checkValidEmail(email) {

		if (!(typeof(email) === 'string' || email instanceof String)) {
			throw new Error("Eroare. Email trebuie sa fie de tip string.");
		}

		let regexEmail = /^\w[\w\.\-]*\w@\w[\w\-\.]*\w$/

		if (email.search(regexEmail) === -1) {
			throw new Error("Eroare. Email invalid.")
		}
	}

	#checkValidUsername(username) {
		

		if (!(typeof(username) === 'string' || username instanceof String)) {
			throw new Error("Eroare. Numele de utilizator trebuie sa fie de tip string.");
		}

		let regexUsername = /^\w+$/

		if (username.search(regexUsername) === -1) {
			throw new Error("Eroare. Nume de utilizator invalid");
		}
	}

	#checkValidPassword(pass) {


		if (!(typeof(pass) === 'string' || pass instanceof String)) {
			throw new Error("Eroare. Parola trebuie sa fie de tip string.");
		}

		let regexPass = /^[^\s]+$/

		if (pass.search(regexPass) === -1) {
			throw new Error("Eraore. Parola invalida");
		}
	}

	toString() {

		return JSON.stringify({"nume": this.#nume, "prenume": this.#prenume, "nrTelefon": this.#nrTelefon, "email": this.#email, "dataNastere": this.#dataNastere.toString(), "username": this.#username, "password": this.#password})
	}

	static fromJSON(obj) {

		return new Participant(obj.nume, obj.prenume, obj.nrTelefon, obj.email, obj.dataNastere, obj.username, obj.password)
	}
}

module.exports = Participant;
