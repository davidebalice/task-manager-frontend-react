import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../Modal/EditModal";
import PhotoModal from "../../Modal/PhotoModal";
import Loading from "../../../components/loading";

const Screenshots = ({
  screenshots,
  taskId,
  projectId,
  onUpdateScreenshots,
  updateScreenshots,
}) => {
  const inputFileRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const [editData, setEditData] = useState({ show: false, text: "", id: "" });
  const [photoData, setPhotoData] = useState({ show: false, imgUrl: "" });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    screenshots: [],
    owner: "",
    task_id: taskId,
    project_id: projectId,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e) => {
    const screenshots = e.target.files;
    setFormData({ ...formData, screenshots: screenshots });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      task_id: taskId,
      project_id: projectId,
    });
    setLoading(false);
  }, [taskId, projectId]);

  function handleUpdateFiles(newFiles) {
    onUpdateScreenshots(newFiles);
  }

  function removeFile(id) {
    Swal.fire({
      title: "Corfirm delete?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            process.env.REACT_APP_API_BASE_URL + "/api/delete/screenshot/",
            { id: id, task_id: taskId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response.data.screenshots");
            console.log(response.data.screenshots);
            handleUpdateFiles(response.data.screenshots);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }

  const openEditModal = (text, id) => {
    setEditData({ show: true, text, id });
  };

  const closeEditModal = () => {
    setEditData(false, null, null);
  };

  const openPhotoModal = (imgUrl, title) => {
    setPhotoData({ show: true, imgUrl, title });
  };

  const closePhotoModal = () => {
    setPhotoData(false, "", "");
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/api/add/screenshot/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("response.data.screenshots");
        console.log(response.data.screenshots);

        setFormData({
          ...formData,
          screenshots: "",
          name: "",
        });

        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }

        handleUpdateFiles(response.data.screenshots);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {Array.isArray(screenshots) && screenshots.length > 0 ? (
            screenshots.map((screenshot) => (
              <div key={screenshot._id}>
                <img
                  src={`${
                    process.env.REACT_APP_API_BASE_URL
                  }/api/screenshot/img/${screenshot && screenshot.file}`}
                  alt=""
                  onClick={() =>
                    openPhotoModal(
                      `${
                        process.env.REACT_APP_API_BASE_URL
                      }/api/screenshot/img/${screenshot && screenshot.file}`,
                      screenshot.name
                    )
                  }
                />

                {screenshot.name}

                <div
                  onClick={() => openEditModal(screenshot.name, screenshot._id)}
                >
                  edit text
                </div>
                <div onClick={() => removeFile(screenshot._id)}>remove</div>
              </div>
            ))
          ) : (
            <div>No screenshots</div>
          )}
          <EditModal
            show={editData.show}
            closeEditModal={closeEditModal}
            editData={editData}
            updateUrl="/api/update/screenshot"
            onUpdateActivities={handleUpdateFiles}
            type="files"
          />
          <PhotoModal
            show={photoData.show}
            closePhotoModal={closePhotoModal}
            title={photoData.title}
            imgUrl={photoData.imgUrl}
          />
          <div>
            <label for="name">
              <b>Add screenshot</b>
            </label>
            <form enctype="multipart/form-data" method="post" id="formUpload">
              <input
                type="text"
                className="form-control"
                name="name"
                required
                value={formData.name}
                onChange={handleInput}
              />
              <input
                type="file"
                className="form-control"
                ref={inputFileRef}
                name="file"
                required
                onChange={handleFile}
                multiple
              />
              <button
                onClick={submitForm}
                className="btn btn-primary btn-sm mt-3"
              >
                Add project
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Screenshots;
