import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { Link, useParams, useNavigate } from "react-router-dom";
import NotPermission from "../Auth/notPermission";

const EditUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const title = "Edit user";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const { id } = useParams();
  const { userData, demo } = useContext(Context);
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
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
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data.user);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", error, "error");
      });
  }, []);

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
          `${process.env.REACT_APP_API_BASE_URL}/api/user/${id}`,
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
            title: "User updated",
            text: "",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Back to users",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
              if (response.data.status === "success") {
                navigate(`/users`);
              }
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const submitPassword = (e) => {
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
          `${process.env.REACT_APP_API_BASE_URL}/api/user/password/${id}`,
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
              confirmButtonText: "Back to users",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
                if (response.data.status === "success") {
                  navigate(`/users`);
                }
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {userData && userData.role === "admin" ? (
        <>
          <div className="page">
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
                  <button
                    onClick={submitForm}
                    className="btn btn-primary btn-sm mt-3"
                  >
                    Save
                  </button>
                </form>
                <br />
                <br />
                update password
                <form className="row justify-content-center">
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      value={passwordData.password}
                      onChange={handleInputPassword}
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
                      value={passwordData.passwordConfirm}
                      onChange={handleInputPassword}
                    />
                  </div>
                  <button
                    onClick={submitPassword}
                    className="btn btn-primary btn-sm mt-3"
                  >
                    Save
                  </button>
                </form>
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

export default EditUser;
