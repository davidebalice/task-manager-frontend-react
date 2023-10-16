import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/breadcrumb/index'
import DataTable_Component from '../../components/DataTable/index'
import Btn_grp from '../../components/payment/payment_btn_grp/index'

import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Button, Form } from "react-bootstrap";
import { faPenToSquare, faTrash, faEnvelope, faCopy } from '@fortawesome/free-solid-svg-icons'
import { apidata } from './store/store'
import { Link } from 'react-router-dom'

export default function Roll_Create() {

    const { storeData } = apidata()

    const title = "Role Management"
    const [apistate, setApiState] = useState([])
    const [rerendarApi, setRerendarApi] = useState(false)
    // open add data modal
    const [open_add_modal, setOpen_add_modal] = useState(false)
    const [apicol, setApiCol] = useState([])

    const brad = [
        {
            name: "home",
        },
        {
            name: title,
        }
    ]
    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.amount,
            sortable: true
        },
        {
            name: "Phone Number",
            selector: row => row.sender_number,
            sortable: true
        },
        {
            name: "Role Type",
            selector: row => row.transaction_id,
            sortable: true
        },
        {
            name: "Status",
            cell: (row) => <><button onClick={() => handleShow(row)} className={`btn py-0 px-1 ${row.status.toLowerCase() == "active" && "btn-success"}    ${row.status.toLowerCase() == "pending" ? "btn-primary" : ""}  btn-sm`}  >{row.status}</button></>,
        },
        {
            name: "action",
            cell: (row) => <><Link to={`/editRole/${row.id}`}><button className=" btn btn-primary btn-sm"  ><FontAwesomeIcon icon={faPenToSquare} /></button></Link><button onClick={() => delete_row(row)} className=" btn btn-danger btn-sm ms-2"  ><FontAwesomeIcon icon={faTrash} /></button></>,
        }

    ]

    const handleShow = (row) => {
        //status model e pass data 
        // setOpenModal(openModal => !openModal)
        // setSelectval(row)
    }

    const setStoreBtn = () => {
        setOpen_add_modal(true)
    }

    {/* data receve from store */ }
    useEffect(() => {
        // call api and response data set " setApiData(your res.data) " and column setApiCol( columns )

        setApiState(storeData)
        setApiCol(columns)
        console.log('render from store data')
    }, [rerendarApi])

    const rerender_status = (e) => {
        setRerendarApi(!rerendarApi)
    }

    const delete_row = (row) => {

        Swal.fire({
            icon: 'warning',
            title: 'You wont be able to revert this!',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setRerendarApi(!rerendarApi)
                Swal.fire('Selete Success. id:' + row.id, '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    const handleClose = () => {
        setOpen_add_modal(false);
    }
    const handleUpdate = () => {
        Swal.fire('Saved!. id:', '', 'success')
        setRerendarApi(!rerendarApi)
    }
    return (
        <>
            <Modal show={open_add_modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter User Name" />
                    <label>Phone Number</label>
                    <input type="text" className="form-control" placeholder="Enter User Phone Number" />
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="Enter User Email" />
                    <label>Role Type</label>
                    <select className="form-control">
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                    </select>
                    <label>Password</label>
                    <input type="text" className="form-control" placeholder="Enter User Password" />
                    <label>Status</label>
                    <select className="form-control">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-sm" onClick={handleUpdate}>
                        Add Role
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container-fluid" >
                <Breadcrumb title={title} brad={brad} />
                <Link to="/editRole" ><button type="button" className="btn btn-outline-primary active btn-sm ">Roll Create and List</button></Link>
                <Link to="/role-access" ><button type="button" className="btn btn-outline-warning btn-sm ms-1">Role Access</button></Link>
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>{title}</h4>
                                <div className="btn btn-info btn-sm " onClick={setStoreBtn}>Add Role</div>
                            </div>
                            <div className="card-body">
                                <DataTable_Component search="name" title={title} apidata={apistate} columns={apicol} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}