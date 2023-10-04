import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
export default function Add_data_modal({ rerendar,select_data, open_update_data_modal }) {

    const [ren, setRen] = useState("false")
    const [update_modal_data, setUpdate_modal_data] = useState(select_data)
    // open modal in status
    const [add_data_modal_Show, set_update_data_modal_Show] = useState(false);

    useEffect(() => {
        setUpdate_modal_data(select_data)
    }, [select_data])
    // console.log(update_modal_data.payment_method)

    // status model show and filter select value 
    useEffect(() => {
        set_update_data_modal_Show(open_update_data_modal.modal_open)
        // setModal_status_data(row.status.toLowerCase());
    }, [open_update_data_modal])

    // console.log(add_data_modal_Show)
    const handleClose = () => {
        set_update_data_modal_Show(false);
    }

    const handleUpdate = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you want to take this action?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              setRen(!ren);
              rerendar(ren)
              Swal.fire('Update success'+update_modal_data.id, '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        setRen(!ren);
        typeof rerendar === 'function' && rerendar(ren)
        set_update_data_modal_Show(false);
    }

    return (
        <>
            {/* status update modal */}
            <Modal  show={add_data_modal_Show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Invoice Data</Modal.Title>

                </Modal.Header>
                <Modal.Body >
                    <div  className="">
                        <label ><b>select brand</ b></label>
                        <select defaultValue={update_modal_data.brand} className="form-control">
                            <option value="onhost">onhost</option>
                            <option value="onhost2">onhost2</option>
                        </select>
                    </div>
                    <div  className=" mt-3">
                        <label ><b>Full name</ b></label>
                        <input type="text" defaultValue={update_modal_data.name} placeholder="Full Name" className="form-control" />
                    </div>
                    <div  className=" mt-3">
                        <label ><b>Email</ b></label>
                        <input type="text" defaultValue={update_modal_data.email} placeholder="Email or Number" className="form-control" />
                    </div>
                    <div  className=" mt-3">
                        <label ><b>Amount</ b></label>
                        <input type="number" defaultValue={update_modal_data.amount} placeholder="Amount" className="form-control" />
                    </div>
                    <div  className=" mt-3">
                        <label ><b>description</ b></label>
                        <textarea type="text" defaultValue={update_modal_data.description} placeholder="description" rows="5" className="form-control" ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-sm" onClick={handleUpdate}>
                        Update Invoice
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}