import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../Modal/EditModal";

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
  }, [taskId, projectId]);

  function handleUpdateFiles(newFiles) {
    onUpdateScreenshots(newFiles);
  }

  function removeFile(id) {
    Swal.fire({
      title: "Corfirm delete?",
      text: "Questa azione non può essere annullata!",
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

        handleUpdateFiles(response.data.files);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      Screenshots
      {screenshots.length}
      {Array.isArray(screenshots) && screenshots.length > 0 ? (
        screenshots.map((screenshot) => (
          <div key={screenshot._id}>
            <a
              href={`${process.env.REACT_APP_API_BASE_URL}/api/download/${screenshot.file}`}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              {screenshot.name}
            </a>
            <div onClick={() => openEditModal(screenshot.name, screenshot._id)}>
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
          <button onClick={submitForm} className="btn btn-primary btn-sm mt-3">
            Add project
          </button>
        </form>
      </div>
    </>
  );
};

export default Screenshots;
