import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const title = "Tasks";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];

  return (
    <>
      {id}

      <div className="container-fluid">
        rthrthrthrth
        <Breadcrumb title={title} brad={brad} />
        <Link to={`/project/add/task/${id}`}>
          <div className="btn btn-info btn-sm text-white">+ Add Task</div>
        </Link>
        <div className="row my-3">
          <div className="col-12">
            <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
              <div className="card-header d-flex justify-content-between border-bottom pb-1">
                <h4>{title}</h4>
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
                            onClick={() => null}
                            className="btn btn-primary btn-sm ms-1"
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </button>

                          <button
                            onClick={() => null}
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
