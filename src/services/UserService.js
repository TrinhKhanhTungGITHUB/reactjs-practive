import instance from "./customize-axios";

const fetchAllUser = (page) => {
    return instance.get(`api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return instance.post(`api/users`, { name, job })
}

const putUpdateUser = (name, job, id) => {
    return instance.put(`/api/users/${id}`, { name, job });
}

const deleteUser = (id) => {
    return instance.delete(`/api/users/${id}`);
}

const loginApi = (email, password) => {
    return instance.post(`api/login`, { email, password })
}


export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi }