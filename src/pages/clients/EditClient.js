import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { Link, useParams } from "react-router-dom";

const EditClient = () => {
  const token = localStorage.getItem("authToken");
  const title = "Edit client";
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
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    companyName: "",
  });
  const [passwordData, setPasswordData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputPassword = (event) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data.client);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", error, "error");
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/client/${id}`,
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
        setResponseData(response.data.message);

        Swal.fire({
          title: "Client updated",
          text: "",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Back to clients",
          cancelButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            if (response.data.status === "success") {
              window.location.href = `/clients/`;
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const submitPassword = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/client/password/${id}`,
        passwordData,
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
        setResponseData(response.data.message);
        if (response.data.message === "success") {
          Swal.fire({
            title: "Password updated",
            text: "",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Back to clients",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
              if (response.data.status === "success") {
                window.location.href = `/clients/`;
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="container-fluid">
        formanta.name:{formData.name}
        <Breadcrumb title={title} brad={brad} />
        {responseData}
        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
          <div className="card-header d-flex justify-content-between border-bottom pb-1">
            <div className="">{title}</div>
          </div>
          <div className="card-body">
            <form className="row justify-content-center">
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
              <button
                onClick={submitForm}
                className="btn btn-primary btn-sm mt-3"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditClient;
