import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailModal from "../../components/Modal/EmailModal";

import {
  faPenToSquare,
  faTrash,
  faEnvelope,
  faCopy,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(1);
  const token = localStorage.getItem("authToken");
  const [modalData, setModalData] = useState({
    show: false,
    name: "",
    surname: "",
    email: "",
  });

  const openEmailModal = (email, name, surname) => {
    setModalData({ show: true, email, name, surname });
  };

  const closeEmailModal = () => {
    setModalData(false, null, null);
  };

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
  }, [token, reload]);

  const title = "Tasks";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];

  function deleteTask(id) {
    Swal.fire({
      title: "Confirm delete?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}/api/task/delete/${id}`,
            { id: id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response.data.user");
            console.log(response.data.user);
            if (response.data.status === "success") {
              setReload((prevCount) => prevCount + 1);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }

  return (
    <>
      <EmailModal
        show={modalData.show}
        closeEmailModal={closeEmailModal}
        modalData={modalData}
      />
      <div className="container-fluid">
        <Breadcrumb title={title} brad={brad} />
        <ButtonGroup projectId={id} selectedTab="tasks" />
        <div className="row">
          <div className="col-12">
            <div className="card pageContainer">
              <div className="card-body">
                <Link to={`/project/add/task/${id}`}>
                  <div className="btn btn-info btn-sm text-white">
                    + Add Task
                  </div>
                </Link>
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
                            onClick={() => null}
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
                              <FontAwesomeIcon icon={faListCheck} />
                              Detail of Task
                            </button>
                          </Link>

                          <Link to={`/project/edit/task/${task._id}`}>
                            <button
                              onClick={() => null}
                              className="btn btn-primary btn-sm ms-1"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                          </Link>

                          <button
                            onClick={() =>
                              openEmailModal(
                                task.project_id.client.email,
                                task.project_id.client.name,
                                task.project_id.client.surname
                              )
                            }
                            className="btn btn-primary btn-sm ms-1"
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </button>

                          <button
                            onClick={() => deleteTask(task._id)}
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
