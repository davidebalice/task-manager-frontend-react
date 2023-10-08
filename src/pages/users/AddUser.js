import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { Link, useParams, useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const title = "Add user";
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
    role: "",
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

  const submitForm = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/api/add/user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setResponseData(response.data.message);

        if (response.data.message === "success") {
          navigate(`/users`);
        }
      })
      .catch((error) => {
        setResponseData(error);
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
            <div className="">{title}</div>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
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
                <label for="role">
                  <b>Role</b>
                </label>
                <select
                  className="form-control"
                  name="role"
                  value={formData.role}
                  required
                  onChange={handleInput}
                >
                  <option value=""> - Select role - </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="col-md-6 mt-3">
                <label for="name">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label for="name">
                  <b>Confirm password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  required
                  value={formData.passwordConfirm}
                  onChange={handleInput}
                />
              </div>
            </div>

            <button
              onClick={submitForm}
              className="btn btn-primary btn-sm mt-3"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
