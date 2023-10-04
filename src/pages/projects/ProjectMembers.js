import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../components/Projects/ButtonGroup/ButtonGroup";

const AddProject = () => {
  const token = localStorage.getItem("authToken");
  const { id } = useParams();
  const title = "Add project";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const [responseData, setResponseData] = useState(null);
  const [data, setData] = useState({ members: [], users: [] });
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    client: "",
    summary: "",
    description: "",
    owner: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadMembers = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/project/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const members = response.data.project.members;
        const users = response.data.users;
        console.log(members);
        console.log(users);

        const data = {
          members: members,
          users: users,
        };

        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);

        Swal.fire("Error", error, "error");
      });
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const addToProject = (member_id) => {
    console.log(member_id);
    console.log(id);
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/api/add/member/project",
        { member_id, project_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        loadMembers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeToProject = (member_id) => {
    console.log(member_id);
    console.log(id);
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/api/remove/member/project",
        { member_id, project_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        loadMembers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <Breadcrumb title={title} brad={brad} />
        <ButtonGroup projectId={id} />
        {responseData}
        PROJECT MEMBERS
        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
          <div className="card-header d-flex justify-content-between border-bottom pb-1">
            <div className="">{title} </div>
            <button className="btn btn-primary btn-sm">Send Test Mail</button>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-6 mt-3">
                <label for="name">
                  <b>Active members</b>
                </label>

                {Array.isArray(data.members) && data.members.length > 0 ? (
                  data.members.map((member) => (
                    <div key={member._id}>
                      <div onClick={() => removeToProject(member._id)}>
                        Remove
                      </div>{" "}
                      {member.surname} {member.name}
                    </div>
                  ))
                ) : (
                  <div>No members</div>
                )}
              </div>
              <div className="col-md-6 mt-3">
                <label for="brand">
                  <b>Add members to project</b>
                </label>

                {Array.isArray(data.users) && data.users.length > 0 ? (
                  data.users.map((user) => (
                    <div key={user.id}>
                      <div onClick={() => addToProject(user._id)}>Add</div>{" "}
                      {user.surname} {user.name} {user._id}
                    </div>
                  ))
                ) : (
                  <div>No users</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
