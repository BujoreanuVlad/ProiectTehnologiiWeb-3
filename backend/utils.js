function checkIfEqual(obj1, obj2) {
	
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

	if (obj1.constructor !== obj2.constructor) {
		return false;
	}

	if (typeof(obj1.equals) === 'function') {
		return obj1.equals(obj2);
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
function checkIsInList(list, obj) {
	
	for (let i = 0; i < list.length; i++) {

		let elem = list[i];

		//Check if object is part of the array
		if (checkIfEqual(elem, obj)) {
			return i;
		}

		//If the array is made up of objects, check if your object is present in the properties of the current element
		for (let propr in elem) {
			if (checkIfEqual(elem[propr], obj)) {
				return i;
			}
		}
	}

	return -1;
}

function genCodAcces(length=6) {

	let codAcces = '';

	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
	  codAcces += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return codAcces;
}

module.exports = { checkIfEqual, checkIsInList, genCodAcces }