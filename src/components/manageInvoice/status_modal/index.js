import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
export default function Status_modal({ row, openModal,rerendar }) {

    const [ren, setRen] = useState("false")
    // modal_status_data
    const [status_modal_data, setModal_status_data] = useState([])
    // open modal in status
    const [status_modal_show, set_status_modal_Show] = useState(false);

    useEffect(() => {
        setModal_status_data(row.status?.toLowerCase())
    }, [row])

    // status model show and filter select value 
    useEffect(() => {
        row.status && (row.status !== 'refunded' && set_status_modal_Show(true))
        // setModal_status_data(row.status.toLowerCase());
    }, [openModal])

    const handleClose = () => {
        set_status_modal_Show(false);
    }

    const handleUpdate = () => {
        setRen(!ren);
        typeof rerendar === 'function' && rerendar(ren)
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
                    <Form.Select defaultValue={status_modal_data} aria-label="trash">
                        <option value="created">Created</option>
                        <option value="pending">Pending</option>                
                        <option value="completed">Completed</option>                                   
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-sm" onClick={handleUpdate}>
                        Update Status
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}