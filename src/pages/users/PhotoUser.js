import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { Link, useParams } from "react-router-dom";

const EditTask = () => {
  const token = localStorage.getItem("authToken");
  const title = "Photo user";
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
    photo: "",
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
    setFormData({ ...formData, photo: selectedFile });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/user/photo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.user);
        setFormData({
          ...response.data.user,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", error, "error");
      });
  }, []);

  const submitForm = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/photo/${id}`,
        { photo: formData.photo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setResponseData(response.data.message);
        setFormData({photo:response.data.photo});
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
              window.location.href = `/users/`;
            }
          }
        });
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
            <div className="row justify-content-center">
              <div className="col-md-6 mt-3">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/api/user/img/${formData.photo}`}
                  class="userImg"
                  alt=""
                />
                <label for="name">
                  <b>Select file</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  required
                  onChange={handleFile}
                />
              </div>
              <div className="col-md-6 mt-3"></div>
            </div>

            <button
              onClick={submitForm}
              className="btn btn-primary btn-sm mt-3"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;
