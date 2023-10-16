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
import Screenshots from "../../components/Tasks/Screenshots/Screenshots";
import moment from "moment";
import Loading from "../../components/loading";

const Project = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activities, setActivities] = useState([]);
  const [comments, setComments] = useState([]);
  const [files, setFiles] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [members, setMembers] = useState([]);
  const [task, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const [tab, setTab] = useState("activities");
  const token = localStorage.getItem("authToken");

  function updateComments(newComments) {
    setComments(newComments);
  }

  function updateFiles(newFiles) {
    setFiles(newFiles);
  }

  function updateScreenshots(newScreenshots) {
    setScreenshots(newScreenshots);
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
        setFiles(response.data.files);
        setScreenshots(response.data, screenshots);
        setTask(response.data.task);
        setMembers(response.data.task.members);
        setProject(response.data.task.project_id);
        setLoading(false);
        console.log(response.data.task);
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
        <Breadcrumb title={title} brad={brad} />
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <ButtonGroup projectId={project._id} selectedTab="tasks" />
            <div className="row">
              <div className="col-12">
                <div className="card pageContainer">
                  <div className="tab-content paymentSetting_content mx-2">
                    <div
                      className="tab-pane fade show active"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div className="row">
                        <div className="col-md-8 " style={{ color: "#333" }}>
                          <div style={{ padding: "20px" }}>
                            <label>
                              <b>{project.name}</b>
                              <br />
                              <b className="projectDetailTitle">{task.name}</b>
                              <br />
                            </label>

                            <div className="projectDetailData">
                              <p>
                                <b>Creation date</b>:<br />
                                {moment(task.createdAt).format("DD/MM/YYYY")}
                              </p>
                              <p>
                                <b>Created by</b>:<br />
                                {task.owner ? task.owner.name : ""}{" "}
                                {task.owner ? task.owner.surname : ""}
                              </p>
                              <p>
                                <b>Last update</b>:<br />
                                {moment(task.lastUpdate).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </p>
                            </div>

                            <div className="taskSection">
                              <p>
                                <b>Task progress</b>:
                              </p>
                              <div className="progressContainer">
                                <div className="progressBarContainer">
                                  <div
                                    className="progressBar"
                                    style={{ width: `${progress}%` }}
                                  >
                                    &nbsp;
                                  </div>
                                </div>
                                <div className="progressBarPercentage">
                                  {progress.toFixed(2)} %
                                </div>
                              </div>
                            </div>

                            <ButtonTask setTab={setTab} tab={tab} />
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
                              <File
                                files={files}
                                onUpdateFiles={updateFiles}
                                projectId={project._id}
                                taskId={task._id}
                              />
                            ) : tab === "screenshots" ? (
                              <Screenshots
                                screenshots={Screenshots}
                                onUpdateScreenshots={updateScreenshots}
                                projectId={project._id}
                                taskId={task._id}
                              />
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
          </>
        )}
      </div>
    </>
  );
};

export default Project;
