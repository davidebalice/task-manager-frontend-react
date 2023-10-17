import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../../components/Modal/EditModal";
import Table from "react-bootstrap/Table";
import Loading from "../../../components/loading";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faListCheck,
  faNoteSticky,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

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
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
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
      title: "Confirm delete?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
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
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <EditModal
            show={editData.show}
            closeEditModal={closeEditModal}
            editData={editData}
            updateUrl="/api/update/activity"
            onUpdateActivities={handleUpdateActivities}
            type="activities"
          />
          <div>
            <div
              className="addButton col-sm-4 col-md-4 col-lg-3"
              onClick={() => setAdd(!add)}
            >
              <FontAwesomeIcon icon={faCirclePlus} className="addButtonIcon" />
              <div className="card-body d-flex px-1">
                {add ? "Close" : "Add activity"}
              </div>
            </div>

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

          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Complete</th>
                <th>Activity</th>
                <th>Data creation</th>
                <th>Created by</th>
                <th>Data update</th>
                <th>Updated by</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(activities) && activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity._id}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={activity.status === "Done"}
                        onChange={(event) => handleStatus(event, activity._id)}
                        className="activityCheckbox"
                      />
                    </td>
                    <td>
                      <p
                        className={
                          activity.status === "Done"
                            ? "activityName cutText"
                            : "activityName"
                        }
                      >
                        {activity.name}
                      </p>
                    </td>

                    <td>
                      {activity.createdAt !== null &&
                        moment(activity.createdAt).format("DD/MM/YYYY")}
                    </td>

                    <td>
                      {activity.owner.name && activity.owner.surname ? (
                        <span>
                          {activity.owner.name} {activity.owner.surname}
                        </span>
                      ) : null}
                    </td>
                    <td>
                      {activity.lastUpdate !== null &&
                        moment(activity.lastUpdate).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td>
                      {activity.lastUpdateUser.name &&
                      activity.lastUpdateUser.surname ? (
                        <span>
                          {activity.lastUpdateUser.name}{" "}
                          {activity.lastUpdateUser.surname}
                        </span>
                      ) : null}
                    </td>

                    <td>
                      <div className="activityButton">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">
                              {" "}
                              Edit activity
                            </Tooltip>
                          }
                        >
                          <div
                            onClick={() =>
                              openEditModal(activity.name, activity._id)
                            }
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
                            <Tooltip className="tooltip">
                              {" "}
                              Delete activity
                            </Tooltip>
                          }
                        >
                        <div onClick={() => removeActivity(activity._id)}>
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
                  <td colspan="5">
                    <br />
                    No activities
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Activities;
