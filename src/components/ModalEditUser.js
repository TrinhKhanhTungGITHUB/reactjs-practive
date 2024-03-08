import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { putUpdateUser } from '../services/UserService';
import { toast } from "react-toastify"

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit, show])

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job, dataUserEdit.id);
        if (res && res.updatedAt) {
            setJob('')
            setName('')
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })

            handleClose()
            toast.success('Đã sửa thành công')
        }
        else {
            toast.success('Lỗi tùm lum')
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}
                backdrop="static" keyboard={false}
            >
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