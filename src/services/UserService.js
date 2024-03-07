import instance from "./customize-axios";

const fetchAllUser = (page) => {
    return instance.get(`api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return instance.post(`api/users`, { name, job })
}

export { fetchAllUser, postCreateUser }