import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
export default function Add_data_modal({rerendar,select_data, open_update_data_modal, }) {




    const [update_modal_data, setUpdate_modal_data] = useState(select_data)

    useEffect(() => {
        setUpdate_modal_data(select_data)
    }, [select_data])
    
    // open modal in status
    const [add_data_modal_Show, set_add_data_modal_Show] = useState(false);

    // status model show and filter select value 
    useEffect(() => {

        set_add_data_modal_Show(open_update_data_modal.modal_open)
        // setModal_status_data(row.status.toLowerCase());

    }, [open_update_data_modal])

    // console.log(add_data_modal_Show)


    const handleClose = () => {
        set_add_data_modal_Show(false);
    }

    const [ren, setRen] = useState("false")

    const handleUpdate = () => {
        setRen(!ren);
        typeof rerendar === 'function' && rerendar(ren)
        set_add_data_modal_Show(false);
    }

    return (
        <>
            {/* status update modal */}
            <Modal show={add_data_modal_Show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Stored Data</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <label>Payment Method</label>
                    <select className="form-control" defaultValue={update_modal_data.payment_method?.toLowerCase()}>
                        <option value="bkash">bKash</option>
                        <option value="nagad">Nagad</option>
                        <option value="rocket">Rocket</option>
                    </select>
                    <input type="hidden" defaultValue={update_modal_data.id} className="form-control" />
                    <label>Amount</label>
                    <input type="text" defaultValue={update_modal_data.amount} className="form-control" />
                    <label>Sender Number</label>
                    <input type="text" defaultValue={update_modal_data.sender_number} className="form-control" />
                    <label>Transaction Id</label>
                    <input type="text" defaultValue={update_modal_data.transaction_id} className="form-control" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-sm" onClick={handleUpdate}>
                        Update Store 
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}