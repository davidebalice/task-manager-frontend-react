import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import EmailModal from "../../components/Modal/EmailModal";
import Pagination from "../../components/pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEnvelope,
  faCopy,
  faListCheck,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const token = localStorage.getItem("authToken");
  const [reload, setReload] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    name: "",
    surname: "",
    email: "",
  });

  const openEmailModal = (email, name, surname) => {
    setModalData({ show: true, email, name, surname });
  };

  const closeEmailModal = () => {
    setModalData(false, null, null);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.users);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, page, reload]);

  function deleteUser(id) {
    Swal.fire({
      title: "Confirm delete?",
      text: "Questa azione non può essere annullata!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}/api/user/delete/${id}`,
            { id: id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response.data.user");
            console.log(response.data.user);
            if (response.data.status === "success") {
              setReload((prevCount) => prevCount + 1);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }

  const title = "Users";
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
      {id}
      <EmailModal
        show={modalData.show}
        closeEmailModal={closeEmailModal}
        modalData={modalData}
      />
      <div className="container-fluid">
        <Breadcrumb title={title} brad={brad} />
        <Link to={`/add/user/`}>
          <div className="btn btn-info btn-sm text-white">+ Add User</div>
        </Link>
        <div className="row my-3">
          <div className="col-12">
            <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
              <div className="card-header d-flex justify-content-between border-bottom pb-1">
                <h4>{title}</h4>
              </div>
              <div className="card-body">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((user) => (
                      <tr>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/api/user/img/${user.photo}`}
                            class="userImg"
                            alt=""
                          />
                        </td>
                        <td>
                          {user.surname} {user.name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            onClick={() => null}
                            className={`btn p-0 px-1 btn-success btn-sm`}
                          >
                            {user.label}
                          </button>
                        </td>
                        <td>progress</td>
                        <td>{user.formattedDeadline}</td>
                        <td>
                          <Link to={`/edit/user/${user._id}`}>
                            <button
                              onClick={() => null}
                              className="btn btn-primary btn-sm ms-1"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                          </Link>

                          <Link to={`/photo/user/${user._id}`}>
                            <button
                              onClick={() => null}
                              className="btn btn-primary btn-sm ms-1"
                            >
                              <FontAwesomeIcon icon={faCamera} />
                            </button>
                          </Link>

                          <button
                            onClick={() =>
                              openEmailModal(
                                user.email,
                                user.name,
                                user.surname
                              )
                            }
                            className="btn btn-primary btn-sm ms-1"
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </button>

                          <button
                            onClick={() => deleteUser(user._id)}
                            className=" btn btn-danger btn-sm ms-1"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  pageName="users"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Users;
