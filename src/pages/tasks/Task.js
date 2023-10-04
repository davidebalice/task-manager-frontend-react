import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";
import ButtonTask from "../../components/Tasks/ButtonTask/ButtonTask";
import Activities from "../../components/Tasks/Activities/Activities";
import Comments from "../../components/Tasks/Comments/Comments";
import File from "../../components/Tasks/File/File";

const Project = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [activities, setActivities] = useState([]);
  const [comments, setComments] = useState([]);
  const [members, setMembers] = useState([]);
  const [task, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const [tab, setTab] = useState("activities");
  const token = localStorage.getItem("authToken");

  function updateComments(newComments) {
    setComments(newComments);
  }

  function updateActivities(newActivities) {
    setActivities(newActivities);
  }

  
  const handleStatus = async (event, id) => {
    const isChecked = event.target.checked;
    try {
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/api/activity/update-status",
          {
            activityId: id,
            checked: isChecked,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          setActivities((prevActivities) =>
            prevActivities.map((activity) =>
              activity._id === id
                ? { ...activity, status: response.data.status }
                : activity
            )
          );
        })
        .catch((error) => {
          console.error("Error during api call:", error);
        });
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/api/task/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setComments(response.data.comments);
        setActivities(response.data.activities);
        setTask(response.data.task);
        setMembers(response.data.task.members);
        setProject(response.data.task.project_id);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token]);

  useEffect(() => {
    const completedActivities = activities.filter(
      (activity) => activity.status === "Done"
    );
    const percentage = parseInt(
      (completedActivities.length / activities.length) * 100
    );
    setProgress(percentage);

    console.log(completedActivities.length);
    console.log(activities.length);
    console.log(percentage);
  }, [activities]);

  const themeBuyHandle = () => {
    Swal.fire("Theme Buy Success", "", "success");
  };
  const themeInstallHandle = () => {
    Swal.fire("Theme Install Success", "", "success");
  };
  const title = "Task";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  return (
    <>
      <div className="container-fluid">
        id: {id}
        <Breadcrumb title={title} brad={brad} />
        <ButtonGroup projectId={id} />
        <div className="row my-3">
          <div className="col-12">
            <div
              className="card"
              style={{ borderTop: "2px solid #4723d9", color: "#333" }}
            >
              <nav className="paymentSetting"></nav>
              <div
                className="tab-content paymentSetting_content mx-2"
                id="nav-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="nav-bkash-personal"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="row">
                    <div className="col-md-8 mt-3" style={{ color: "#333" }}>
                      <div>
                        <label>
                          <b>project name: {project.name}</b>
                          <br />
                          <b>task name: {task.name}</b>
                          <br />
                          <b>project id: {project._id}</b>
                          <br />
                          <b>task id: {task._id}</b>
                          <br />
                          <b>owner id: {task.owner}</b>
                        </label>
                        <p>created on: {task.createdAt}</p>
                        <p>last update: aaa</p>
                        <p>progress: {progress} %</p>
                        <br />
                        <div className="progressBarContainer">
                          <div
                            className="progressBar"
                            style={{ width: `${progress}%` }}
                          >
                            &nbsp;
                          </div>
                        </div>

                        <ButtonTask setTab={setTab} />
                        {task._id}
                        <br />
                        {tab === "activities" ? (
                          <Activities
                            activities={activities}
                            handleStatus={handleStatus}
                            onUpdateActivities={updateActivities}
                            projectId={project._id}
                            taskId={task._id}
                          />
                        ) : tab === "comments" ? (
                          <Comments
                            comments={comments}
                            onUpdateComments={updateComments}
                            projectId={project._id}
                            taskId={task._id}
                          />
                        ) : tab === "file" ? (
                          <File />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4 mt-3">
                      <div>
                        <label>
                          <b>Client</b>
                        </label>
                        <p>aaaa</p>
                      </div>

                      <div>
                        <label>
                          <b>Budget</b>
                        </label>
                        <p>aaaa</p>
                      </div>

                      <div>
                        <label>
                          <b>Tasks</b>
                        </label>
                        <p>aaaa</p>
                      </div>

                      <div>
                        <label>
                          <b>Members</b>
                        </label>

                        {Array.isArray(members) && members.length > 0 ? (
                          members.map((member) => (
                            <div key={member._id}>
                              {member.surname} {member.name}
                            </div>
                          ))
                        ) : (
                          <div>No members</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
