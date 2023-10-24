import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import NotPermission from "../Auth/notPermission";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const navigate = useNavigate();
  const { userData, demo } = useContext(Context);
  const token = localStorage.getItem("authToken");
  const title = "Photo client";
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
    if (demo) {
      Swal.fire({
        title: "Demo mode",
        text: "Crud operations are not allowed",
        icon: "error",
        cancelButtonText: "Close",
      });
    } else {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/client/photo/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.client);
          setFormData({
            ...response.data.client,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire("Error", error, "error");
        });
    }
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
          `${process.env.REACT_APP_API_BASE_URL}/api/client/photo/${id}`,
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
          setFormData({ photo: response.data.photo });
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
                navigate("/clients");
              }
            }
          });
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
                <div className="row justify-content-center">
                  <div className="col-md-6 mt-3">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/api/client/img/${formData.photo}`}
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
      ) : (
        <>
          <NotPermission />
        </>
      )}
    </>
  );
};

export default EditTask;
