import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
// import { postCreateUser } from '../services/UserService';
// import { toast } from "react-toastify"

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    },[dataUserEdit, show])

    const handleEditUser = async () => {
        // let res = await postCreateUser(name, job);
        // console.log("name:", name, "job", job);
        // console.log(res);
        // if (res && res.id) {
        //     handleClose()
        //     setJob('')
        //     setName('')
        //     toast.success('Alo')
        //     handleUpdateTable({ first_name: name,id:res.id})
        // }
        // else {
        //     toast.success('Lỗi tùm lum')
        // }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="email" className="form-control" value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input type="text" className="form-control" value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;