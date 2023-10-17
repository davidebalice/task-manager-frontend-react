import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

const EditProject = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const title = "Edit project";
  const [file, setFile] = useState(null);
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    client: "",
    summary: "",
    description: "",
    owner: "",
    imageCover: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/edit/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data.project);
        setClients(response.data.clients);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);

        Swal.fire("Error", error, "error");
      });
  }, []);

  const submitForm = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/edit/project/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response.data");
        console.log(response.data);

        if (response.data.status === "success") {
          Swal.fire({
            title: "Project updated",
            text: "",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Back to projects",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
              if (response.data.status === "success") {
                navigate("/projects");
              }
            }
          });
        } else if (response.data.status === "demo") {
          Swal.fire({
            title: "Demo mode",
            text: "Crud operations are not allowed",
            icon: "error",
            cancelButtonText: "Close",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const submitFormPhoto = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/project/photo/${id}`,
        { imageCover: file },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setFormData({
          ...formData,
          imageCover: response.data.imageCover,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="page">
        {formData.imageCover}
        <Breadcrumb title={title} brad={brad} />
        <div class="row">
          <Link to={`/projects`}>
            <div class="addButton col-sm-4 col-md-4 col-lg-3">
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                className="addButtonIcon"
              />
              <div class="card-body d-flex px-1">Back</div>
            </div>
          </Link>
        </div>
        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
          <div className="card-header d-flex justify-content-between border-bottom pb-1">
            <div className="">{title} </div>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-6 mt-3">
                <label for="name">
                  <b>Project name</b>
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
                <label for="budget">
                  <b>Budget</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label for="client">
                  <b>Client</b>
                </label>
                <select
                  className="form-control"
                  name="client"
                  value={formData.client}
                  required
                  onChange={handleInput}
                >
                  {clients ? (
                    clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.companyName}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading clients...</option>
                  )}
                  <option value=""> - Select client - </option>
                </select>
              </div>
              <div className="col-md-6 mt-3"></div>

              <div className="col-md-12">
                <label for="summary">
                  <b>Summary</b>
                </label>
                <textarea
                  className="form-control"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInput}
                ></textarea>
              </div>

              <div className="col-md-12">
                <label for="description">
                  <b>Full description</b>
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
              Save
            </button>

            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-6 mt-3">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/api/project/cover/${formData.imageCover}`}
                    class="userImg"
                    alt=""
                  />

                  <label for="photo">
                    <b>Select file</b>
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    name="imageCover"
                    required
                    onChange={handleFile}
                  />
                </div>
                <div className="col-md-6 mt-3"></div>
              </div>

              <button
                onClick={submitFormPhoto}
                className="btn btn-primary btn-sm mt-3"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProject;
