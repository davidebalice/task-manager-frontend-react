import { useState, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { useNavigate } from "react-router-dom";
import NotPermission from "../Auth/notPermission";

const AddClient = () => {
  const navigate = useNavigate();
  const { userData, demo } = useContext(Context);
  const token = localStorage.getItem("authToken");
  const title = "Add client";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    companyName: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (demo) {
      Swal.fire({
        title: "Demo mode",
        text: "Crud operations are not allowed",
        icon: "error",
        cancelButtonText: "Close",
      });
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/api/add/client",
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
          setResponseData(response.data.message);

          if (response.data.message === "success") {
            navigate("/clients");
          }
        })
        .catch((error) => {
          setResponseData(error);
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {userData && userData.role === "admin" ? (
        <>
          <div className="page">
            <Breadcrumb title={title} brad={brad} />
            {responseData}
            <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
              <div className="card-header d-flex justify-content-between border-bottom pb-1">
                <div className="">{title}</div>
              </div>
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-6 mt-3">
                    <label for="priority">
                      <b>Company name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label for="priority">
                      <b>Email</b>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Surname</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="surname"
                      required
                      value={formData.surname}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Name</b>
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
                </div>

                <button
                  onClick={submitForm}
                  className="btn btn-primary btn-sm mt-3"
                >
                  Add Client
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NotPermission />
        </>
      )}
    </>
  );
};

export default AddClient;
