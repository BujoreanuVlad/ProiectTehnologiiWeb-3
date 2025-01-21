import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';

export async function getGrupEvenimenteAll(token) {
    return await axios.get(
        "grupEvenimente/getAll",
        {headers: {
			"Content-Type": "application/json",
			"Authorization": token
		}}
    );
}

export async function getEvenimenteByGrupId(id, token) {
    return await axios.get(
        "grupEvenimente/getEvents/" + id,
        {headers: {
			"Content-Type": "application/json",
			"Authorization": token
		}}
    );
}

export async function getEvenimentId(id, token) {
    return await axios.get(
        "eveniment/getById/" + id,
        {headers: {
			"Content-Type": "application/json",
			"Authorization": token
		}}
    );
}


export async function getParticipantsByEvenimentId(id, token) {
    return await axios.get(
        "inscrieri/event/" + id,
        {headers: {
			"Content-Type": "application/json",
			"Authorization": token
		}}
    );
}

export async function getEventsByParticipantId(id, token) {
    return await axios.get(
        "inscrieri/user/" + id,
        {headers:{
			"Content-Type": "application/json",
			"Authorization": token
		}}
    );
}

export async function inscrieParticipantLaEveniment(username, idEvent, token) {
    return await axios.post(
        "inscrieri/user/" + username + "/event/" + idEvent, {},
        {headers:{
			"Content-Type": "application/json",
			"Authorization": token
		}}
    );
}

export async function confirmaPrezentaParticipantLaEveniment(username, idEvent, codAcces, token) {
    return await axios.post(
        "inscrieri/user/" + username + "/event/" + idEvent + "/codAcces/" + codAcces, {},
        {headers:{
			"Content-Type": "application/json",
			"Authorization": token
		}}
    );
}

export async function addGrupEvenimente(groupName, token) {
    try {
        const response = await axios.post('grupEvenimente/create', {
            nume: groupName,
        }, {
            headers:
				{
					"Content-Type": "application/json",
					"Authorization": token
				}
        });
        return response.data; 
    } catch (error) {
        console.error("Eroare la adăugarea grupului:", error);
        throw error;
    }
}

export async function addEveniment(eventData, token) {
    try {
        const response = await axios.post('/eveniment/create', eventData, {
            headers:
				{
					"Content-Type": "application/json",
					"Authorization": token
				}
        });
        return response.data; 
    } catch (error) {
        console.error("Eroare la adăugarea evenimentului:", error);
        throw error; 
    }
}

export async function getDistinctDates(token) {
    try {
        const response = await axios.get('/eveniment/getDates', {
            headers:
				{
					"Content-Type": "application/json",
					"Authorization": token
				}
        });
        return response.data; 
    } catch (error) {
        console.error("Eroare la obținerea datelor distincte:", error);
        throw error;
    }
}

export async function getEvenimenteByDate(date, token) {
    try {
        const response = await axios.get(`/eveniment/getByDate/${date}`, {
            headers:
				{
					"Content-Type": "application/json",
					"Authorization": token
				}
        });
        return response.data; 
    } catch (error) {
        console.error("Eroare la obținerea evenimentelor pentru dată:", error);
        throw error;
    }
}

export async function getEvenimenteAll(token) {
    try {
        const response = await axios.get('/eveniment/getAll', {
            headers:
				{
					"Content-Type": "application/json",
					"Authorization": token
				}
        });
        return response.data;
    } catch (error) {
        console.error("Eroare la obținerea tuturor evenimentelor:", error);
        throw error;
    }
}
export async function loginUser(username, password) {
    try {
        const response = await axios.post('auth/login', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Eroare la autentificare:", error);
        throw error; 
        
    }
}

export async function registerUser(userData) {
    try {
        const response = await axios.post('/auth/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Eroare la înregistrare:", error);
        throw error;
    }
}
