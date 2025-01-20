import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';

export async function getGrupEvenimenteAll() {
    return await axios.get(
        "grupEvenimente/getAll",
        { "Content-Type": "application/json" }
    );
}

export async function getEvenimenteByGrupId(id) {
    return await axios.get(
        "grupEvenimente/getEvents/" + id,
        { "Content-Type": "application/json" }
    );
}

export async function getEvenimentId(id) {
    return await axios.get(
        "eveniment/getById/" + id,
        { "Content-Type": "application/json" }
    );
}


export async function getParticipantsByEvenimentId(id) {
    return await axios.get(
        "inscrieri/event/" + id,
        { "Content-Type": "application/json" }
    );
}

export async function addGrupEvenimente(groupName) {
    try {
        const response = await axios.post('grupEvenimente/create', {
            nume: groupName,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Eroare la adăugarea grupului:", error);
        throw error;
    }
}

export async function addEveniment(eventData) {
    try {
        const response = await axios.post('/eveniment/create', eventData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Eroare la adăugarea evenimentului:", error);
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
