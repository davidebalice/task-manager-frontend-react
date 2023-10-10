import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Preview_img from "../../assets/photo/admin.jpg";
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

  const themeBuyHandle = () => {
    Swal.fire("Theme Buy Success", "", "success");
  };
  const themeInstallHandle = () => {
    Swal.fire("Theme Install Success", "", "success");
  };
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
                <div
                  className="projectCardCover"
                  style={{ backgroundImage: `url(${Preview_img})` }}
                ></div>
                <div className="projectCardButton">
                  <Link to={`/project/members/${data._id}`}>members</Link>
                  <Link to={`/edit/project/${data._id}`}>
                    <button className="btn btn-primary btn-sm ">edit</button>
                  </Link>
                  <Link to={`/project/${data._id}`}>
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
