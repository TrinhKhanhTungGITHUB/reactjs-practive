import instance from "./customize-axios";

const fetchAllUser = (page) => {
    return instance.get(`api/users?page=${page}`)
}

export {fetchAllUser}