import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../../components/Modal/EditModal";
import Loading from "../../../components/loading";
import Table from "react-bootstrap/Table";
import Divider from "../../divider/";
import Spacer from "../../spacer/";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleXmark,
  faNoteSticky,
  faTrash,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Files = ({ files, taskId, projectId, onUpdateFiles, updateFiles }) => {
  const inputFileRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const [add, setAdd] = useState(false);
  const [editData, setEditData] = useState({ show: false, text: "", id: "" });
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, [taskId, projectId]);

  function handleUpdateFiles(newFiles) {
    onUpdateFiles(newFiles);
  }

  function removeFile(id) {
    Swal.fire({
      title: "Confirm delete?",
      text: "",
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
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div
            className="addButton col-sm-4 col-md-4 col-lg-3"
            onClick={() => setAdd(!add)}
          >
            <FontAwesomeIcon
              icon={add ? faCircleXmark : faCirclePlus}
              className="addButtonIcon"
            />
            <div className="card-body d-flex px-1">
              {add ? "Close" : "Add file"}
            </div>
          </div>

          {add && (
            <form enctype="multipart/form-data" method="post" id="formUpload">
              <label for="name">
                <b>Add file to task</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
                value={formData.name}
                onChange={handleInput}
                placeholder="Description of file"
              />
              <Spacer height={20} />
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
                className="btn addButtonSm btn-sm mt-3"
              >
                <FontAwesomeIcon icon={faPlus} className="addButtonIconSm" />
                Add file
              </button>
              <Divider
                className="divider"
                marginTop={60}
                marginBottom={60}
                borderSize={1}
                borderType={"solid"}
                borderColor={"#ddd"}
              >
                {" "}
              </Divider>
            </form>
          )}

          <Table className="tableRow" hover bordered>
            <thead>
              <tr>
                <th>Data creation</th>
                <th>Created by</th>
                <th style={{ width: "60%" }}>File</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(files) && files.length > 0 ? (
                files.map((file) => (
                  <tr key={file._id}>
                    <td>
                      {file.createdAt !== null &&
                        moment(file.createdAt).format("DD/MM/YYYY")}
                    </td>

                    <td>
                      {file.owner.name && file.owner.surname ? (
                        <span>
                          {file.owner.name} {file.owner.surname}
                        </span>
                      ) : null}
                    </td>

                    <td>
                      <a
                        href={`${process.env.REACT_APP_API_BASE_URL}/api/download/${file.file}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        {file.name}
                        <br />
                        <u>{file.file}</u>
                      </a>
                    </td>

                    <td>
                      <div className="activityButton">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">
                              {" "}
                              Edit description of file
                            </Tooltip>
                          }
                        >
                          <div
                            onClick={() => openEditModal(file.name, file._id)}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="activityButtonEdit"
                            />
                          </div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip"> Delete file</Tooltip>
                          }
                        >
                          <div onClick={() => removeFile(file._id)}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="activityButtonDelete"
                            />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="7" className="text-center p-5">
                    <br />
                    No files
                    <br />
                    <br />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <EditModal
            show={editData.show}
            closeEditModal={closeEditModal}
            editData={editData}
            updateUrl="/api/update/file"
            onUpdateActivities={handleUpdateFiles}
            type="files"
          />
        </>
      )}
    </>
  );
};

export default Files;
