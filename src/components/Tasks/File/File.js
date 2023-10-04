import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../../components/Modal/EditModal";

const Files = ({ files, taskId, projectId, onUpdateFiles, updateFiles }) => {
  const token = localStorage.getItem("authToken");
  const [add, setAdd] = useState(false);
  const [editData, setEditData] = useState({ show: false, text: "", id: "" });

  const formUpload = document.getElementById("formUpload");

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
    //formDataToSend.append("name", formData.name);
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
      title: "Sei sicuro?",
      text: "Questa azione non può essere annullata!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sì, rimuovi!",
      cancelButtonText: "No, annulla",
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
            /*
            const owner = data.owner;
            setFormData({
              ...formData,
              owner: owner,
            });
    */
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

    const formDataToSend = new FormData(formUpload);
    console.log("formDataToSend");
    console.log(formDataToSend);

    formDataToSend.append("name", "asdasdasd");
    console.log(formDataToSend);
    console.log(formDataToSend.name);

    const dataToSend = {
      name: formData.name,
      file: formData.files, // Estrai i file dalla FormData
    };

    formDataToSend.append("name", formData.name);
    console.log("formData.files.length");
    console.log(formData.files.length);
    // Aggiungi tutti i file all'oggetto FormData
    for (let i = 0; i < formData.files.length; i++) {
      formDataToSend.append("files", formData.files[i]);
    }
    console.log("formData.files.length");
    console.log(formData.files.length);

    console.log("formDataToSend.files");
    console.log(formDataToSend.files);
    console.log(formDataToSend.name);
    console.log(formDataToSend.name8);

    console.log("formDataToSend");
    console.log(formDataToSend);

    console.log("dataToSend");
    console.log(dataToSend);

    console.log(formData.taskId);

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
        });

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
            {file.name} {file.file}
            <div onClick={() => openEditModal(file.name, file._id)}>edit</div>
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
