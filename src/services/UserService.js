import instance from "./customize-axios";

const fetchAllUser = (page) => {
    return instance.get(`api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return instance.post(`api/users`, { name, job })
}

const putUpdateUser = (name, job,id) => {
    console.log({name,job});
    return instance.put(`/api/users/${id}`, { name, job });
}

export { fetchAllUser, postCreateUser, putUpdateUser }