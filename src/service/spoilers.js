import axios from "axios";

const api = axios.create({
    baseURL: "https://spoiler-api.herokuapp.com/api/spoiler",
    headers: {
        "Content-type": "application/json"
    }
});

async function getAll() {
    return await api.get("/");
}

async function getOne(id) {
    return await api.get(`/${id}`);
}

async function create(data) {
    return await api.post("/", data);
}

async function update(id, data) {
    return await api.put(`/${id}`, data);
}

async function remove(id) {
    return await api.delete(`/${id}`);
}

async function removeAll(id, data) {
    return await api.delete(`/`);
}

async function getByTitle(title) {
    return await api.get(`/${title}`);
}

const services = {
    getAll,
    getOne,
    create,
    update,
    remove,
    removeAll,
    getByTitle
};

export { services };