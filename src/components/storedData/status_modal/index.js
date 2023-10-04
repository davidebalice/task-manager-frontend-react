import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
export default function Status_modal({ row, openModal, rerendar }) {

    // modal_status_data
    const [status_modal_data, setModal_status_data] = useState([])
    const [rerendarApi, setRerendarApi] = useState(true)
    const [status_modal_show, set_status_modal_Show] = useState(false);
    const [ren, setRen] = useState(false)

    useEffect(() => {
        setModal_status_data(row.status?.toLowerCase())
    }, [row])

    // status model show and filter select value 
    useEffect(() => {
        row.status && set_status_modal_Show(true)
        // setModal_status_data(row.status.toLowerCase());
    }, [openModal])

    const handleClose = () => {
        set_status_modal_Show(false);
    }

    const handleUpdate = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you want to take this action!',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setRen(!ren);
                typeof rerendar === 'function' && rerendar(ren)
                setRerendarApi(!rerendarApi)
                Swal.fire('Status Changed:', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

        set_status_modal_Show(false);
    }

    return (
        <>
            {/* status update modal */}
            <Modal show={status_modal_show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="hidden" defaultValue={row.id} />
                    <Form.Select defaultValue={status_modal_data} aria-label="trash">
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-sm" onClick={handleUpdate}>
                        Add Status
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}