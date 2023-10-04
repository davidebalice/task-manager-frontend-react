import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
export default function Add_data_modal({ openAddDataModal,rerendar }) {


  


    // open modal in status
    const [add_data_modal_Show, set_add_data_modal_Show] = useState(false);

    // status model show and filter select value 
    useEffect(() => {

        set_add_data_modal_Show(openAddDataModal.modal_open)
        // setModal_status_data(row.status.toLowerCase());

    }, [openAddDataModal])

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
                    <Modal.Title>Add Stored Data</Modal.Title>
                        
                </Modal.Header>
                <Modal.Body>
                    <label>Payment Method</label>
                    <select className="form-control">
                        <option value="bkash">bKash</option>
                        <option value="nagad">Nagad</option>
                        <option value="rocket">Rocket</option>
                    </select>
                    
                    <label>Amount</label>
                    <input type="text" className="form-control" />
                    <label>Sender Number</label>
                    <input type="text" className="form-control" />
                    <label>Transaction Id</label>
                    <input type="text"  className="form-control" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-sm" onClick={handleUpdate}>
                        Add store 
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}