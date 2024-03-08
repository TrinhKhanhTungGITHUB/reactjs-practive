import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { postCreateUser } from '../services/UserService';
import { toast } from "react-toastify"

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        console.log("name:", name, "job", job);
        console.log(res);
        if (res && res.id) {
            handleClose()
            setJob('')
            setName('')
            toast.success('Bạn đã thêm thành công')
            handleUpdateTable({ first_name: name,id:res.id})
        }
        else {
            toast.error('Bạn gặp lỗi ')
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
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
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;