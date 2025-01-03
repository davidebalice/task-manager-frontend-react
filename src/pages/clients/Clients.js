import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/index";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import EmailModal from "../../components/Modal/EmailModal";
import Pagination from "../../components/pagination/Pagination";
import NotPermission from "../Auth/notPermission";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Spacer from "../../components/spacer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEnvelope,
  faCirclePlus,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

const Clients = () => {
  const { id } = useParams();
  const { userData, demo } = useContext(Context);
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
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/clients?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.clients);
        setData(response.data.clients);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, reload, page]);

  function deleteClient(id) {
    Swal.fire({
      title: "Confirm delete?",
      text: "Questa azione non può essere annullata!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (demo) {
          Swal.fire({
            title: "Demo mode",
            text: "Crud operations are not allowed",
            icon: "error",
            cancelButtonText: "Close",
          });
        } else {
          axios
            .post(
              `${process.env.REACT_APP_API_BASE_URL}/api/client/delete/${id}`,
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
              console.log("response.data.status");
              console.log(response.data.status);
              if (response.data.status === "success") {
                setReload((prevCount) => prevCount + 1);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
    });
  }

  const title = "Clients";
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
      {userData && userData.role === "admin" ? (
        <>
          <EmailModal
            show={modalData.show}
            closeEmailModal={closeEmailModal}
            modalData={modalData}
          />
          <div className="page">
            <Breadcrumb title={title} brad={brad} />
            <Link to={`/add/client/`}>
              <div className="addButton col-sm-4 col-md-4 col-lg-3">
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="addButtonIcon"
                />
                <div className="card-body d-flex px-1">Add client</div>
              </div>
            </Link>
            <div className="row my-3">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Table className="tableRow" hover bordered>
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((client) => (
                          <tr>
                            <td>
                              <img
                                src={`${process.env.REACT_APP_API_BASE_URL}/api/client/img/${client.photo}`}
                                class="userImg"
                                alt=""
                              />
                            </td>
                            <td>{client.companyName}</td>
                            <td>{client.email}</td>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip className="tooltip">
                                    {" "}
                                    Edit client
                                  </Tooltip>
                                }
                              >
                                <Link to={`/edit/client/${client._id}`}>
                                  <button
                                    onClick={() => null}
                                    className="btn btn-primary btn-sm ms-1"
                                  >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  </button>
                                </Link>
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip className="tooltip">
                                    {" "}
                                    Logo client
                                  </Tooltip>
                                }
                              >
                                <Link to={`/photo/client/${client._id}`}>
                                  <button
                                    onClick={() => null}
                                    className="btn btn-primary btn-sm ms-1"
                                  >
                                    <FontAwesomeIcon icon={faCamera} />
                                  </button>
                                </Link>
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip className="tooltip">
                                    {" "}
                                    Send email to client
                                  </Tooltip>
                                }
                              >
                                <button
                                  onClick={() =>
                                    openEmailModal(
                                      client.email,
                                      client.companyName,
                                      null
                                    )
                                  }
                                  className="btn btn-primary btn-sm ms-1"
                                >
                                  <FontAwesomeIcon icon={faEnvelope} />
                                </button>
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip className="tooltip">
                                    {" "}
                                    Delete client
                                  </Tooltip>
                                }
                              >
                                <button
                                  onClick={() => deleteClient(client._id)}
                                  className=" btn btn-danger btn-sm ms-1"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Spacer height={20} />
                    {data && (
                      <Pagination
                        pageName="users"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NotPermission />
        </>
      )}
    </>
  );
};
export default Clients;
