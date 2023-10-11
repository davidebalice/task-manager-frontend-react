import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.projects);
        console.log(response.data.projects);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token]);

  const title = "Projects";
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

        <div className="row">
          <Link to={`/add/project/`}>
            <div className="addProject col-sm-4 col-md-4 col-lg-3">
              <FontAwesomeIcon icon={faCirclePlus} className="addProjectIcon" />
              <div className="card-body d-flex px-1">Add project</div>
            </div>
          </Link>
        </div>

        <div className="row">
          {data.map((data, i) => (
            <div className="col-sm-4 col-md-4 col-lg-3" key={`project${i}`}>
              <div className="porjectCard">
                <div>
                  <div
                    className="projectCardCover"
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL}/api/project/cover/${data.imageCover}`,
                    }}
                  >
                    <Link
                      to={`/edit/project/${data._id}`}
                      className="projectCardButton"
                    >
                      <button className="btn btn-primary btn-sm ">edit</button>
                    </Link>
                  </div>

                  <div className="projectCardTitle">
                    <p>{data.name}</p>
                    <div className="projectCardLastUpdate">
                      last update
                      <br />
                      <b>{data.lastUpdate}</b>
                    </div>
                  </div>
                </div>

                <div className="projectCardButtonContainer">
                  <Link
                    to={`/project/members/${data._id}`}
                    className="projectCardButton"
                  >
                    <p className="projectCardButtonTitle">Created by</p>
                    {data.owner.slice(0, 3).map((owner, i) => (
                      <>
                        <img
                          src={`${
                            process.env.REACT_APP_API_BASE_URL
                          }/api/user/img/${owner && owner.photo}`}
                          class="projectUserImg"
                          alt=""
                        />{" "}
                      </>
                    ))}
                  </Link>

                  <Link
                    to={`/project/members/${data._id}`}
                    className="projectCardButton"
                  >
                    <p className="projectCardButtonTitle">
                      Members: {data.members.length}
                    </p>
                    <div>
                      {data.members
                        .filter((member) => member._id !== data.owner._id)
                        .slice(0, 3)
                        .map((member, i) => (
                          <img
                            src={`${
                              process.env.REACT_APP_API_BASE_URL
                            }/api/user/img/${member && member.photo}`}
                            className={`projectUserImg ${
                              i === 0 ? "" : "projectUserImg2"
                            }`}
                            style={{
                              zIndex: i === 1 ? "4" : i === 2 ? "3" : "",
                            }}
                            alt=""
                          ></img>
                        ))}
                    </div>
                  </Link>

                  <Link
                    to={`/project/${data._id}`}
                    className="projectCardButton mr-0"
                  >
                    <p className="projectCardButtonTitle">
                      Task {data.numTasks}
                    </p>
                    <button className="btn btn-primary btn-sm ">detail</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
