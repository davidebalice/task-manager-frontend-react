import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../../components/Modal/EditModal";

const Files = ({ files, taskId, projectId, onUpdateFiles, updateFiles }) => {
  const inputFileRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const [editData, setEditData] = useState({ show: false, text: "", id: "" });

  const [formData, setFormData] = useState({
    name: "",
    file: [],
    owner: "",
    task_id: taskId,
    project_id: projectId,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, files: files });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      task_id: taskId,
      project_id: projectId,
    });
  }, [taskId, projectId]);

  function handleUpdateFiles(newFiles) {
    onUpdateFiles(newFiles);
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
            process.env.REACT_APP_API_BASE_URL + "/api/delete/file/",
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
            console.log("response.data.files");
            console.log(response.data.files);
            handleUpdateFiles(response.data.files);
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
      .post(process.env.REACT_APP_API_BASE_URL + "/api/add/file/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response.data.files");
        console.log(response.data.files);

        setFormData({
          ...formData,
          file: "",
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
      Files
      {files.length}
      {Array.isArray(files) && files.length > 0 ? (
        files.map((file) => (
          <div key={file._id}>
            <a
              href={`${process.env.REACT_APP_API_BASE_URL}/api/download/${file.file}`}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              {file.name}
            </a>
            <div onClick={() => openEditModal(file.name, file._id)}>
              edit text
            </div>
            <div onClick={() => removeFile(file._id)}>remove</div>
          </div>
        ))
      ) : (
        <div>No files</div>
      )}
      <EditModal
        show={editData.show}
        closeEditModal={closeEditModal}
        editData={editData}
        updateUrl="/api/update/file"
        onUpdateActivities={handleUpdateFiles}
        type="files"
      />
      <div>
        <label for="name">
          <b>Add file</b>
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

export default Files;
