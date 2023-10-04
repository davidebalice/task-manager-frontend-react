import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
export default function Details_modal({ row,view_id,openDetailsModal, rerendar }) {

  // re-render state
  const [ren, setRen] = useState("false")

  {/* all data for view */ }
  const [modal_all_data, setModal_all_data] = useState([])

  {/* see all details modal(view) */ }
  const [view_modal_show, set_view_modal_Show] = useState(false);

  // store data;
  useEffect(() => {
    setModal_all_data(row)
  }, [row])

  // show view modal;
  useEffect(() => {
    row.status && set_view_modal_Show(true);
  }, [openDetailsModal])

  const handleClose = () => {
    set_view_modal_Show(false);
  }

  // swite alert

  // sendRequest
  const sendRequest = () => {
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
        Swal.fire('Send Request!id:'+view_id, '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  //  end sendRequest

  // reFundHandle
  const reFundHandle = () => {

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
        Swal.fire('Refund success!id:'+view_id, '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  //  end reFundHandle

  // approveHandle
  const approveHandle = () => {
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
        Swal.fire('Approval Success!id:'+view_id, '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  //  end approveHandle

  // approve_sendReqHandle
  const approve_sendReqHandle = () => {

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

        Swal.fire('send Approval!id:'+view_id, '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  //  end approve_sendReqHandle

  // restoreHandle
  const restoreHandle = () => {



    Swal.fire({
      icon: 'warning',
      title: 'Do you want to restore it?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setRen(!ren);
        typeof rerendar === 'function' && rerendar(ren)
        Swal.fire('ReStore Aproval!id:'+view_id, '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  //  end restoreHandle

  // delete data

  const deleteHandle = () => {

    Swal.fire({
      icon: 'warning',
      title: 'You wont be able to revert this!',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      setRen(!ren);
      rerendar(ren)
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      

        Swal.fire('Delete Data!id:'+view_id, '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  return (
    <>


      <Modal show={view_modal_show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2 my-3">
            {modal_all_data.status?.toLowerCase() == "complete" && (
              <><button type="button" onClick={sendRequest} className="btn btn-outline-success  btn-sm mx-1">Send request</button>
                <button type="button" onClick={reFundHandle} className="btn btn-outline-warning btn-sm mx-1">Refund</button>
              </>
            )}

            {modal_all_data.status?.toLowerCase() == "pending" && (
              <><button type="button" onClick={approveHandle} className="btn btn-outline-success  btn-sm mx-1">Approve</button>
                <button type="button" onClick={approve_sendReqHandle} className="btn btn-outline-warning btn-sm mx-1">Approve & Send request</button>
              </>
            )}
            {modal_all_data.status?.toLowerCase() == "delete" && (
              <><button type="button" onClick={restoreHandle} className="btn btn-outline-warning  btn-sm mx-1">Restore</button>

              </>
            )}

            <button type="button" onClick={deleteHandle} className="btn btn-outline-danger  btn-sm mx-1">Delete</button>
          </div>

          <div className="table-responsive my-3">
            <table className="table align-middle border table-striped table-hover">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Invoice Id</th>

                </tr>
              </thead>
              <tbody>

                {Object.entries(modal_all_data).map((data, i) => {
                  return (<tr key={i}>
                    <td>{data[0]}</td>
                    <td>{data[1]}</td>

                  </tr>)
                })}

              </tbody>
            </table>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                    </Button>

        </Modal.Footer>
      </Modal>

    </>
  )
}