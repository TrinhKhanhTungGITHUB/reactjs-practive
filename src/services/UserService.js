import instance from "./customize-axios";

const fetchAllUser = (page) => {
    return instance.get(`api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return instance.post(`api/users`, { name, job })
}

const putUpdateUser = (name, job,id) => {
    return instance.put(`/api/users/${id}`, { name, job });
}

const deleteUpdateUser = (id) => {
    return instance.delete(`/api/users/${id}`);
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUpdateUser }