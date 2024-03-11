import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from "lodash";
import { debounce } from 'lodash';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';


const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState([]);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState([]);

    const [sortBy, setSortBy] = useState('asc')
    const [sortField, setSortFiled] = useState('id')

    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        getUsers(1);
    }, []);

    //Modal Close
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    // Func Add
    const handleClick = () => {
        setIsShowModalAddNew(true)
    }

    // update List
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            // setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            setListUsers(res.data)
        }
    }

    //Paginate List
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };
    // Edit
    const handleEditUser = (user) => {
        setIsShowModalEdit(true)
        setDataUserEdit(user)
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    }
    // Delete
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handleDeleteUserFromModal = (user) => {
        setSortBy(sortBy);
        setSortFiled(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers);
    }

    // Sort
    const handleSort = (sortBy, sortField) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        setListUsers(cloneListUsers);
    }

    //Search
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUsers(cloneListUsers);
        }
        else {
            getUsers(1);
        }
    }, 500)
    return (
        <>
            <div className='my-3 add-new'>
                <span><b>List Users:</b></span>
                <button className='btn btn-success' onClick={handleClick}>Add New User</button>
            </div>
            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    placeholder='Search users by email ...'
                    // value={ keyword}
                    onChange={(event) => {
                        handleSearch(event)
                    }}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i className='fa-solid fa-arrow-down-long'
                                        onClick={() => handleSort("desc", "id")}
                                    >
                                    </i>
                                    <i className='fa-solid fa-arrow-up-long'
                                        onClick={() => handleSort("asc", "id")}
                                    >
                                    </i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First name</span>
                                <span>
                                    <i className='fa-solid fa-arrow-down-long'
                                        onClick={() => handleSort("desc", "first_name")}
                                    >
                                    </i>
                                    <i className='fa-solid fa-arrow-up-long'
                                        onClick={() => handleSort("asc", "first_name")}
                                    >
                                    </i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={() => { handleEditUser(item) }}>
                                            Edit</button>
                                        <button
                                            className='btn btn-danger mx-3'
                                            onClick={() => handleDeleteUser(item)}>
                                            Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                renderOnZeroPageCount={null}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>

    )
}

export default TableUsers