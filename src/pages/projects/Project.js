import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSackDollar,
  faListCheck,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";

const Project = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [openTasksPercentage, setOpenTasksPercentage] = useState(0);
  const token = localStorage.getItem("authToken");
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/api/project/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.project);
        setTasks(response.data.tasks);
        setMembers(response.data.project.members);
        console.log(response.data.project);
        console.log(response.data.tasks);
        console.log(response.data.project.members);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token]);

  useEffect(() => {
    const openTasks = tasks.filter((task) => task.status === "Open").length;
    const totalTasks = tasks.length;
    //const openTasksPercentage = (openTasks.length / totalTasks) * 100;
    const openTasksPercentage =
      totalTasks > 0 ? (openTasks / totalTasks) * 100 : 0;
    setOpenTasksPercentage(openTasksPercentage);
  }, [tasks]);

  const title = "Project";
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
        <ButtonGroup projectId={id} selectedTab="project" />
        <div className="row">
          <div className="col-12">
            <div className="card pageContainer">
              <div className="tab-content paymentSetting_content mx-2">
                <div
                  className="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="row" style={{ padding: "20px" }}>
                    <div className="col-md-8 mt-3" style={{ color: "#333" }}>
                      <div>
                        <label className="projectDetailTitle">
                          {data.name}
                        </label>
                        <div className="projectDetailData">
                          <p><b>Creation date</b>:<br />{data.createdAt}</p>
                          <p><b>Created by</b>:<br />44444</p>
                          <p><b>Last update</b>:<br />aaa</p>
                        </div>
                        <p>progress: %</p>
                        {openTasksPercentage.toFixed(2)}%
                        <div className="progressBarContainer">
                          <div
                            className="progressBar"
                            style={{ width: `${openTasksPercentage}%` }}
                          >
                            &nbsp;
                          </div>
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
                        <div>
                          <label>
                            <b>Description</b>
                          </label>
                          <br />
                          {data.description}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mt-3">
                      <div className="sideSection">
                        <div className="sideSectionIcon">
                          <FontAwesomeIcon icon={faUser} />
                        </div>

                        <label>
                          <b>Client</b>
                          <p className="sideSectionTitle">aaaa</p>
                        </label>
                      </div>

                      <div className="sideSection">
                        <div className="sideSectionIcon">
                          <FontAwesomeIcon icon={faSackDollar} />
                        </div>
                        <label>
                          <b>Budget</b>
                          <p className="sideSectionTitle">aaaa</p>
                        </label>
                      </div>

                      <div className="sideSection">
                        <div className="sideSectionIcon">
                          <FontAwesomeIcon icon={faListCheck} />
                        </div>
                        <label>
                          <b>Tasks</b>
                          <p>
                            Total:{" "}
                            <b className="sideSectionNumber">{tasks.length}</b>{" "}
                            - Completed:{" "}
                            <b className="sideSectionNumber">
                              {
                                tasks.filter((task) => task.status === "Open")
                                  .length
                              }
                            </b>{" "}
                            - Opened:{" "}
                            <b className="sideSectionNumber">
                              {tasks.length -
                                tasks.filter((task) => task.status === "Open")
                                  .length}
                            </b>
                          </p>
                        </label>
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
