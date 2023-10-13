import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";
import EmailModal from "../../components/Modal/EmailModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEnvelope,
  faCirclePlus,
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
                  <div className="addProject col-sm-4 col-md-4 col-lg-3">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="addProjectIcon"
                    />
                    <div className="card-body d-flex px-1">Add task</div>
                  </div>
                </Link>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Last update</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Label</th>
                      <th>Activities</th>
                      <th>Progress</th>
                      <th>Dead line</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length === 0 && <p className="my-5">Task not found</p>}
                    {data.map((task) => {
                      const totalActivities = task.activities.length;
                      const completedActivities = task.activities.filter(
                        (activity) => activity.status === "Done"
                      ).length;
                      let completionPercentage =
                        totalActivities > 0
                          ? (completedActivities / totalActivities) * 100
                          : 0;

                      const highestLastUpdate = task.activities.reduce(
                        (highest, activity) => {
                          if (!highest || activity.lastUpdate > highest) {
                            console.log(activity.lastUpdate);
                            return activity.lastUpdate;
                          }
                          return highest;
                        },
                        null
                      );

                      const formattedLastUpdate = highestLastUpdate
                        ? moment(highestLastUpdate).format("DD/MM/YYYY HH:mm")
                        : " - - -";

                      return (
                        <tr>
                          <td>{task.formattedDate}</td>
                          <td>{formattedLastUpdate}</td>
                          <td>{task.name}</td>
                          <td>{task.status}</td>
                          <td
                            style={{
                              color:
                                task.priority === "High" ? "#ff0000" : "#333",
                            }}
                          >
                            {task.priority}
                          </td>
                          <td>
                            <button
                              onClick={() => null}
                              className={`btn p-0 px-1 btn-success btn-sm`}
                            >
                              {task.label}
                            </button>
                          </td>
                          <td>{totalActivities}</td>
                          <td>{completionPercentage.toFixed(2)}% </td>
                          <td>{task.formattedDeadline}</td>
                          <td
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Link
                              to={`/project/task/${task._id}`}
                              style={{ flex: "1" }}
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip style={{ width: "180px" }}>
                                    {" "}
                                    Detail of task, activities, files, comments
                                  </Tooltip>
                                }
                              >
                                <button className=" btn btn-primary btn-sm ms-1 btnTask">
                                  <FontAwesomeIcon
                                    icon={faListCheck}
                                    className="taskIcon taskIcon3"
                                  />
                                  Detail of Task
                                </button>
                              </OverlayTrigger>
                            </Link>

                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Link to={`/project/edit/task/${task._id}`}>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip style={{ width: "80px" }}>
                                      Edit
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    onClick={() => null}
                                    className="btn btn-primary btn-sm ms-1 taskButton"
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      className="taskIcon"
                                    />
                                  </button>
                                </OverlayTrigger>
                              </Link>

                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip style={{ width: "120px" }}>
                                    Send email to client
                                  </Tooltip>
                                }
                              >
                                <button
                                  onClick={() =>
                                    openEmailModal(
                                      task.project_id.client.email,
                                      task.project_id.client.name,
                                      task.project_id.client.surname
                                    )
                                  }
                                  className="btn btn-primary btn-sm ms-1 taskButton"
                                >
                                  <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="taskIcon"
                                  />
                                </button>
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip style={{ width: "100px" }}>
                                    Delete task
                                  </Tooltip>
                                }
                              >
                                <button
                                  onClick={() => deleteTask(task._id)}
                                  className="btn btn-danger btn-sm ms-1 taskButton"
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="taskIcon taskIcon2"
                                  />
                                </button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
