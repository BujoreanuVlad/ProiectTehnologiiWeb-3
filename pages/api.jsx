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
