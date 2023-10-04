import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Status_modal from "../../components/manageInvoice/status_modal/index";
import Update_data_modal from "../../components/manageInvoice/update_data_modal/index";
import Email_sender_data_modal from "../../components/manageInvoice/send_email/index";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEnvelope,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.tasks);

        setData(response.data.tasks);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token]);

  const [selectVal, setSelectval] = useState([]);
  const [openModal, setOpenModal] = useState(true);
  const [rerendarApi, setRerendarApi] = useState(false);
  const [open_add_modal, setOpen_add_modal] = useState({
    render: true,
    modal_open: false,
  });
  // open email sender modal
  const [open_email_sender_modal, setOpen_email_sender_modal] = useState({
    render: true,
    modal_open: false,
  });
  const [email_sender_modal_data, setEmail_sender_modal_data] = useState("");
  // open update data modal
  const [open_update_modal, setOpen_update_modal] = useState({
    render: true,
    modal_open: false,
  });
  const [update_modal_data, setUpdate_modal_data] = useState("");
  const title = "Tasks";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];

  const handleShow = (row) => {
    //status model e pass data
    setOpenModal((openModal) => !openModal);
    setSelectval(row);
  };

  const setStoreBtn = () => {
    setOpen_add_modal({ render: !open_add_modal.render, modal_open: true });
  };
  const emailSender = (id) => {
    setOpen_email_sender_modal({
      render: !open_email_sender_modal.render,
      modal_open: true,
    });
    setEmail_sender_modal_data(id);
  };

  const setUpdateStoreBtn = (row) => {
    setOpen_update_modal({
      render: !open_update_modal.render,
      modal_open: true,
    });
    setUpdate_modal_data(row);
  };

  const delete_row = (row) => {
    Swal.fire({
      icon: "warning",
      title: "You wont be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      setRerendarApi(!rerendarApi);
      if (result.isConfirmed) {
        Swal.fire("Saved!. id:" + row.id, "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const rerender = (e) => {
    setRerendarApi(e);
  };

  return (
    <>
      whwrth rtwrwhtrqthrt {id}
      {/* status modal component */}
      <Status_modal
        rerendar={(e) => rerender(e)}
        row={selectVal}
        openModal={openModal}
      />
      {/* update data modal */}
      <Update_data_modal
        rerendar={(e) => rerender(e)}
        select_data={update_modal_data}
        open_update_data_modal={open_update_modal}
      />
      {/* email sender modal */}
      <Email_sender_data_modal
        select_data={email_sender_modal_data}
        open_update_data_modal={open_email_sender_modal}
      />
      <div className="container-fluid">
        rthrthrthrth
        <Breadcrumb title={title} brad={brad} />
        <Link to="/stored-data">
          <button
            type="button"
            className="btn btn-outline-success active btn-sm "
          >
            All
          </button>
        </Link>
        <Link to="/invoice-link">
          <button type="button" className="btn btn-outline-primary btn-sm ms-1">
            Invoice Link
          </button>
        </Link>
        <div className="row my-3">
          <div className="col-12">
            <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
              <div className="card-header d-flex justify-content-between border-bottom pb-1">
                <h4>{title}</h4>
                <Link to="/add-invoice">
                  <div className="btn btn-info btn-sm text-white">
                    Add Invoice
                  </div>
                </Link>
              </div>
              <div className="card-body">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Label</th>
                      <th>Progress</th>
                      <th>Dead line</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((task) => (
                      <tr>
                        <td>{task.formattedDate}</td>
                        <td>{task.name}</td>
                        <td>{task.status}</td>
                        <td>{task.priority}</td>
                        <td>
                          <button
                            onClick={() => handleShow()}
                            className={`btn p-0 px-1 btn-success btn-sm`}
                          >
                            {task.label}
                          </button>
                        </td>
                        <td>progress</td>
                        <td>{task.formattedDeadline}</td>
                        <td>
                          <Link to={`/project/task/${task._id}`}>
                            <button className=" btn btn-primary btn-sm ms-1 btnTask">
                              <FontAwesomeIcon icon={faPenToSquare} />
                              Detail of Task
                            </button>
                          </Link>

                          <button
                            onClick={() => emailSender(task._id)}
                            className="btn btn-primary btn-sm ms-1"
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </button>

                          <button
                            onClick={() => delete_row()}
                            className=" btn btn-danger btn-sm ms-1"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tasks;
