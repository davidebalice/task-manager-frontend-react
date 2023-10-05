import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Preview_img from "../../assets/photo/admin.jpg";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
      <div class="container-fluid">
        <Breadcrumb title={title} brad={brad} />
        <div class="row">
          <div class="col-sm-4 col-md-4 col-lg-3" key="add new project">
            <div class="card">
              +
              <div class="card-body d-flex px-1 justify-content-between">
                create new project
                <Link to={`/add/project/`}>
                  <button className="btn btn-primary btn-sm ">detail</button>
                </Link>
              </div>
            </div>
          </div>

          {data.map((data, i) => (
            <div class="col-sm-4 col-md-4 col-lg-3" key={i}>
              <div class="card">
                <img
                  src={Preview_img}
                  class="card-img-top"
                  style={{ height: 220 }}
                  alt="..."
                />
                <div class="card-body d-flex px-1 justify-content-between">
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
