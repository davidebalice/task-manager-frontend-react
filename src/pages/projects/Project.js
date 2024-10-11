import {
  faListCheck,
  faSackDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/index";
import Loading from "../../components/loading";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";
import Spacer from "../../components/spacer";
import { Context } from "../../context/UserContext";

const Project = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { userData, demo } = useContext(Context);
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [openTasksPercentage, setOpenTasksPercentage] = useState(0);
  const token = localStorage.getItem("authToken");
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  let backgroundProgress = "#36c20b";

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
        setLoading(false);
        console.log("response.data.project");
        console.log(response.data.project);
        console.log(response.data.tasks);
        console.log(response.data.project.members);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token]);

  useEffect(() => {
    const openTasks = tasks.filter((task) => task.status === "Close").length;
    const totalTasks = tasks.length;
    const openTasksPercentage =
      totalTasks > 0 ? (openTasks / totalTasks) * 100 : 0;
    setOpenTasksPercentage(openTasksPercentage);
  }, [tasks]);

  useEffect(() => {
    if (openTasksPercentage < 25) {
      backgroundProgress = "red";
    } else if (openTasksPercentage < 55) {
      backgroundProgress = "orange";
    } else {
      backgroundProgress = "#36c20b";
    }
  }, [openTasksPercentage]);

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
      <div className="page">
        <Breadcrumb title={title} brad={brad} />

        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <ButtonGroup projectId={id} selectedTab="project" />
            <div className="row projectRow">
              <div className="card pageContainer">
                <div className="tab-content paymentSetting_content mx-2">
                  <div
                    className="tab-pane fade show active"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="row" style={{ padding: "20px" }}>
                      <div
                        className="col-12 col-md-8 mt-3"
                        style={{ color: "#333" }}
                      >
                        <div>
                          <b className="projectDetailTitle">{data.name}</b>
                          <div className="projectDetailData">
                            <p className="projectDetailColumn">
                              <p className="projectDetailMidTitle">
                                Creation date:
                              </p>
                              {moment(data.createdAt).format("DD/MM/YYYY")}
                            </p>
                            <p className="projectDetailColumn">
                              <p className="projectDetailMidTitle mb-0">
                                Created by:
                              </p>
                              {data.owner ? data.owner.name : ""}{" "}
                              {data.owner ? data.owner.surname : ""}
                              <div className="imgThumbContainer mt-2">
                                <img
                                  src={`${
                                    process.env.REACT_APP_API_BASE_URL
                                  }/api/user/img/${
                                    data.owner.photo && data.owner.photo
                                  }`}
                                  class="imgThumb"
                                  alt=""
                                />
                              </div>
                            </p>
                            <p className="projectDetailColumn">
                              <p className="projectDetailMidTitle">
                                Last update:
                              </p>
                              {moment(data.lastUpdate).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </p>

                            <div>
                              <p className="projectDetailMidTitle mb-0">
                                <b>Project progress</b>:
                              </p>
                              <div className="progressContainer">
                                <div className="progressBarContainer">
                                  <div
                                    className="progressBar"
                                    style={{
                                      width: `${openTasksPercentage}%`,
                                      backgroundColor: `${backgroundProgress}`,
                                    }}
                                  >
                                    &nbsp;
                                  </div>
                                </div>
                                <div className="progressBarPercentage">
                                  {openTasksPercentage >= 0.1
                                    ? openTasksPercentage.toFixed(2)
                                    : "0"}{" "}
                                  %
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="projectSection">
                            <label>
                              <b>Members</b>
                            </label>
                            <br />

                            {Array.isArray(members) && members.length > 0 ? (
                              members.map((member) => (
                                <div
                                  key={member._id}
                                  className="membersRow memberSide"
                                >
                                  <div className="imgThumbContainer">
                                    <img
                                      src={`${
                                        process.env.REACT_APP_API_BASE_URL
                                      }/api/user/img/${
                                        member.photo && member.photo
                                      }`}
                                      class="imgThumb"
                                      alt=""
                                    />
                                    <span className="text-primary bold">
                                      {member.name} {member.surname}
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div>No members</div>
                            )}
                            <Spacer height={1} />
                          </div>

                          <div className="projectSection">
                            <label>
                              <b>Description</b>
                            </label>
                            <br />
                            {data.description}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-4 mt-3 ">
                        <div className="sideSection">
                          <div className="sideSectionItem">
                            <div className="sideSectionIcon">
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                            <label className="sideSectionCol">
                              <b>Client</b>
                              <p className="sideSectionTitle">
                                {data.client && data.client.companyName}
                              </p>
                            </label>
                          </div>

                          <div className="sideSectionItem">
                            <div className="sideSectionIcon">
                              <FontAwesomeIcon icon={faSackDollar} />
                            </div>
                            <label className="sideSectionCol">
                              <b>Budget</b>
                              <p className="sideSectionTitle">
                                € {data.budget}
                              </p>
                            </label>
                          </div>

                          <div
                            className="sideSectionItem"
                            style={{ alignItems: "flex-start" }}
                          >
                            <div className="sideSectionIcon">
                              <FontAwesomeIcon icon={faListCheck} />
                            </div>
                            <label className="sideSectionCol">
                              <b>Tasks</b>
                              <p>
                                Total:{" "}
                                <b className="sideSectionNumber text-primary">
                                  {tasks.length}
                                </b>
                                <br />
                                Completed:{" "}
                                <b className="sideSectionNumber text-primary">
                                  {
                                    tasks.filter(
                                      (task) => task.status === "Open"
                                    ).length
                                  }
                                </b>
                                <br />
                                Opened:{" "}
                                <b className="sideSectionNumber text-primary">
                                  {tasks.length -
                                    tasks.filter(
                                      (task) => task.status === "Open"
                                    ).length}
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
          </>
        )}
      </div>
    </>
  );
};

export default Project;
