import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash,faShuffle, faEnvelope, faCopy } from '@fortawesome/free-solid-svg-icons'
export default function Status_modal({ apikeys,row, openModal, rerendar }) {



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

    const handleUpdate = () => {
        Swal.fire('Update success', '', 'success')
        setRen(!ren);
        typeof rerendar === 'function' && rerendar(ren)
        set_status_modal_Show(false);
    }
    const reGenerate=()=>{   
        Swal.fire({
            icon: 'info',
            title: 'You want to generate new  API KEY!',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setRen(!ren);
                // toast.success('Api regenerate')
                Swal.fire('success', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })  
    }
    const copyLink=()=>{
        navigator.clipboard.writeText(apikeys.api1)
        Swal.fire('Copy success', '', 'success')
      }
    const copyLink2=()=>{
        navigator.clipboard.writeText(apikeys.api2)
        Swal.fire('Copy success', '', 'success')
      }
    const copyLink3=()=>{
        navigator.clipboard.writeText(apikeys.api3)
        Swal.fire('Copy success', '', 'success')
      }
    return (
        <>
            {/* status update modal */}
            <Modal show={status_modal_show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Api Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>API KEY</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control Readonly" defaultValue={apikeys.api1} aria-label="apigenerate" readOnly />
                        <span className="input-group-text" onClick={reGenerate} >
                            <FontAwesomeIcon icon={faShuffle} />
                        </span>
                        <span className="input-group-text"  onClick={copyLink}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </div>
                    <label>API V1</label>
                    <div className="input-group mb-3"  >
                        <input type="text" className="form-control Readonly" defaultValue={apikeys.api2} aria-label="apigenerate" readOnly />
                        
                        <span className="input-group-text" onClick={copyLink2}>
                             <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </div>
                    <label>API V2</label>
                    <div className="input-group mb-3">
                        <input type="text"  className="form-control Readonly" defaultValue={apikeys.api3} aria-label="apigenerate" readOnly />
                       
                        <span onClick={copyLink3} className="input-group-text">
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </div>
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