import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
export default function Status_modal({ row, openModal,rerendar,status_id }) {



    // modal_status_data
    const [status_modal_data, setModal_status_data] = useState([])
    useEffect(() => {
        setModal_status_data(row.status?.toLowerCase())
    }, [row])

    
    // open modal in status
    const [status_modal_show, set_status_modal_Show] = useState(false);
   
    // status model show and filter select value 
    useEffect(() => {

        row.status && (row.status !== 'refunded' && set_status_modal_Show(true))
        // setModal_status_data(row.status.toLowerCase());
    }, [openModal])

    const handleClose = () => {
        set_status_modal_Show(false);
    }
  const [ren, setRen] = useState("false")

    const handleUpdate =()=>{
        Swal.fire({
            icon: 'warning',
            title: 'Are you want to take this action?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            setRen(!ren);
            rerendar(ren)
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Send Request.id:'+status_id, '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
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
                        <option value="void">Void</option>
                        <option value="pending">Pending</option>
                        <option value="complete">Compeleted</option>
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