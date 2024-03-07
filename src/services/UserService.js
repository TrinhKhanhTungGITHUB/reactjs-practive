import instance from "./customize-axios";

const fetchAllUser = () => {
    return instance.get("api/users?page=2")
}

export {fetchAllUser}