import { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";
import Breadcrumb from "../../components/breadcrumb/index";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

const AddTask = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const title = "Add task";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const { id } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    priority: "",
    label: "",
    description: "",
    deadline: "",
    owner: "",
    project_id: id,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /*
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/api/add/task", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        const owner = response.data.owner;
        setFormData({
          ...formData,
          owner: owner,
        });
      })
      .catch((error) => {
        console.error("Error:", error);

        Swal.fire("Error", error, "error");
      });
  }, []);
*/

  const submitForm = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/api/add/task", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response.data");
        console.log(response.data);
        setResponseData(response.data.message);
        const owner = data.owner;
        setFormData({
          ...formData,
          owner: owner,
        });

        if (response.data.create === "success") {
          navigate(`/project/tasks/${id}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <Breadcrumb title={title} brad={brad} />
        <ButtonGroup projectId={id} selectedTab="tasks" />
        <div className="card pageContainer">
          <div className="card-body">
            <Link to={`/project/tasks/${id}`}>
              <div class="addProject col-sm-4 col-md-4 col-lg-3">
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className="addProjectIcon"
                />
                <div class="card-body d-flex px-1">Back</div>
              </div>
            </Link>
            <div className="row justify-content-center">
              <div className="col-md-6 mt-3">
                <label for="name">
                  <b>Name of task</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label for="status">
                  <b>Status</b>
                </label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  required
                  onChange={handleInput}
                >
                  <option value=""> - Select status - </option>
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
              </div>
              <div className="col-md-6 mt-3">
                <label for="priority">
                  <b>Priority</b>
                </label>
                <select
                  className="form-control"
                  name="priority"
                  value={formData.priority}
                  required
                  onChange={handleInput}
                >
                  <option value=""> - Select priority - </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="col-md-6 mt-3">
                <label for="label">
                  <b>Label</b>
                </label>
                <select
                  className="form-control"
                  name="label"
                  value={formData.label}
                  required
                  onChange={handleInput}
                >
                  <option value=""> - Select label - </option>
                  <option value="Task">Task</option>
                  <option value="Bug">Bug</option>
                  <option value="Quote">Quote</option>
                </select>
              </div>

              <div className="col-md-6 mt-3">
                <label for="deadline">
                  <b>Deadline date</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleInput}
                />
              </div>

              <div className="col-md-6 mt-3"></div>

              <div className="col-md-12">
                <label for="brand">
                  <b>Description</b>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>

            <button
              onClick={submitForm}
              className="btn btn-primary btn-sm mt-3"
            >
              Add task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
