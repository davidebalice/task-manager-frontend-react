import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
export default function Add_data_modal({ select_data, open_update_data_modal }) {
    // store data 
    const [update_modal_data, setUpdate_modal_data] = useState(select_data)
    const [add_data_modal_Show, set_add_data_modal_Show] = useState(false);

    useEffect(() => {
        setUpdate_modal_data(select_data)
    }, [select_data])

    // status model show and filter select value 
    useEffect(() => {
        set_add_data_modal_Show(open_update_data_modal.modal_open)
    }, [open_update_data_modal])

    const handleClose = () => {
        set_add_data_modal_Show(false);
    }
    const sendEmail = () => {
        Swal.fire('email send success', '', 'success')
    }


    return (
        <>
            {/* status update modal */}
            <Modal show={add_data_modal_Show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Email invoice details to the client?</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className=" mt-3">
                        <label ><b>Client Email</ b></label>
                        <input type="text" defaultValue={update_modal_data.email} placeholder="Email or Number" className="form-control" />
                    </div>
                    <div className=" mt-3">
                        <label><b>Email Subject</ b></label>
                        <input type="text" defaultValue="" placeholder="Email Subject" className="form-control" />
                    </div>
                    <div className=" mt-3">
                        <label ><b>description</ b></label>
                        <textarea type="text" defaultValue={update_modal_data.description} placeholder="description" rows="5" className="form-control" ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-sm" onClick={sendEmail}>
                        Update Invoice
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}