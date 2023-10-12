import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";

const Project = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
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
        setMembers(response.data.project.members);
        console.log(response.data.project.members);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token]);

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
            <div
              className="card pageContainer"
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
                  <div className="row" style={{padding:'20px'}}>
                    <div className="col-md-8 mt-3" style={{ color: "#333" }}>
                      <div>
                        <label>
                          <b>{data.name}</b>
                        </label>
                        <p>created on: {data.createdAt}</p>
                        <p>last update: aaa</p>
                        <p>progress: %</p>
                      </div>

                      <div className="col-md-8 mt-3" style={{ color: "#333" }}>
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

                    <div className="col-md-4 mt-3">
                      <div className="sideSection">
                        <label>
                          <b>Client</b>
                        </label>
                        <p>aaaa</p>
                      </div>

                      <div className="sideSection">
                        <label>
                          <b>Budget</b>
                        </label>
                        <p>aaaa</p>
                      </div>

                      <div className="sideSection">
                        <label>
                          <b>Tasks</b>
                        </label>
                        <p>aaaa</p>
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
