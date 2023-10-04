import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";

const AddProject = () => {
  const token = localStorage.getItem("authToken");
  const title = "Add project";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const [responseData, setResponseData] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    client: "",
    summary: "",
    description: "",
    owner: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/api/add/project", {
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

  const submitForm = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/api/add/project", formData, {
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
         window.location.href='/projects';
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
        {responseData}
        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
          <div className="card-header d-flex justify-content-between border-bottom pb-1">
            <div className="">{title} </div>
            <button className="btn btn-primary btn-sm">Send Test Mail</button>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-6 mt-3">
                <label for="name">
                  <b>Name project</b>
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
                <label for="brand">
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
                  {data.clients ? (
                    data.clients.map((client) => (
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
                <label for="brand">
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
                <label for="brand">
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
              Add project
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
