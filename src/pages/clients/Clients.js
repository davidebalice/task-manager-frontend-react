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

const Clients = () => {
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
      {id}
      <EmailModal
        show={modalData.show}
        closeEmailModal={closeEmailModal}
        modalData={modalData}
      />
      <div className="page">
        <Breadcrumb title={title} brad={brad} />
        <Link to={`/add/client/`}>
          <div className="btn btn-info btn-sm text-white">+ Add Client</div>
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
                    {data.map((client) => (
                      <tr>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/api/client/img/${client.photo}`}
                            class="userImg"
                            alt=""
                          />
                        </td>
                        <td>
                          {client.surname} {client.name} {client.createdAt}
                        </td>
                        <td>{client.email}</td>
                        <td>{client.role}</td>
                        <td>
                          <button
                            onClick={() => null}
                            className={`btn p-0 px-1 btn-success btn-sm`}
                          >
                            {client.label}
                          </button>
                        </td>
                        <td>progress</td>
                        <td>{client.formattedDeadline}</td>
                        <td>
                          <Link to={`/edit/client/${client._id}`}>
                            <button
                              onClick={() => null}
                              className="btn btn-primary btn-sm ms-1"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                          </Link>

                          <Link to={`/photo/client/${client._id}`}>
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
                                client.email,
                                client.name,
                                client.surname
                              )
                            }
                            className="btn btn-primary btn-sm ms-1"
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </button>

                          <button
                            onClick={() => deleteClient(client._id)}
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
                  pageName="clients"
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
export default Clients;
