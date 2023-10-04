import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../../components/Modal/EditModal";

const Activities = ({
  activities,
  handleStatus,
  taskId,
  projectId,
  onUpdateActivities,
  updateActivities,
}) => {
  const token = localStorage.getItem("authToken");
  const [add, setAdd] = useState(false);
  const [editData, setEditData] = useState({ show: false, text: "", id: "" });
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    task_id: taskId,
    project_id: projectId,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      task_id: taskId,
      project_id: projectId,
    });
  }, [taskId, projectId]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateActivities = (newActivities) => {
    onUpdateActivities(newActivities);
  };

  const openEditModal = (text, id) => {
    setEditData({ show: true, text, id });
  };

  const closeEditModal = () => {
    setEditData(false, null, null);
  };

  const removeActivity = (id) => {
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
            process.env.REACT_APP_API_BASE_URL + "/api/delete/activity/",
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
            console.log("response.data.activities");
            console.log(response.data.activities);

            handleUpdateActivities(response.data.activities);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/api/add/activity/",
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
        console.log("response.data.activities");
        console.log(response.data.activities);

        setFormData({
          ...formData,
          name: "",
        });
        setAdd(false);
        handleUpdateActivities(response.data.activities);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      Activities
      {activities.length}
      task_id:{formData.task_id}
      <br />
      <EditModal
        show={editData.show}
        closeEditModal={closeEditModal}
        editData={editData}
        updateUrl="/api/update/activity"
        onUpdateActivities={handleUpdateActivities}
        type="activities"
      />
      <div>
        <button onClick={() => setAdd(true)}>+ add activity</button>
        {add && (
          <form>
            <label for="name">
              <b>Add activity to task</b>
            </label>

            <textarea
              type="text"
              className="form-control"
              name="name"
              required
              value={formData.name}
              onChange={handleInput}
            ></textarea>
            <button
              onClick={submitForm}
              className="btn btn-primary btn-sm mt-3"
            >
              Add activity
            </button>
          </form>
        )}
      </div>
      {Array.isArray(activities) && activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity._id}>
            <input
              type="checkbox"
              checked={activity.status === "Done"}
              onChange={(event) => handleStatus(event, activity._id)}
            />
            {activity.name}
            <div onClick={() => openEditModal(activity.name, activity._id)}>
              edit
            </div>
            <div onClick={() => removeActivity(activity._id)}>remove</div>
          </div>
        ))
      ) : (
        <div>No activities</div>
      )}
    </>
  );
};

export default Activities;
