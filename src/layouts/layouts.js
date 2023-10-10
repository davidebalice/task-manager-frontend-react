import React, { useContext, useState, useEffect } from "react";
import "./layout.css";
import "boxicons";
import Swal from "sweetalert2";
import { Context } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logoWhite.png";
import logo2 from "../assets/img/logoWhite2.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
  faListUl,
  faBuildingColumns,
  faIndent,
  faFileInvoice,
  faTableList,
  faUsersGear,
  faStore,
  faGear,
  faMobileScreen,
  faGlobe,
  faWrench,
  faLifeRing,
  faGaugeHigh,
  faEye,
  faPenToSquare,
  faEnvelope,
  faBell,
  faRing,
  faKey,
  faPuzzlePiece,
  faUniversalAccess,
  faTree,
  faMessage,
  faListCheck,
  faCircleInfo,
  faPeopleGroup,
  faVideo,
  faUser,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default function Layouts() {
  const { userData } = useContext(Context);
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const [render, setRender] = useState(true);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [sidebar, setSidebar] = useState("");
  const [headerNavManu, setheaderNavManu] = useState(true);

  const defaultOpenSidebar = localStorage.getItem("defaultOpenSidebar");

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/forgot-password" ||
      pathname === "/register"
    ) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (defaultOpenSidebar === "open") {
      setHeaderToggle(true);
      setheaderNavManu(false);
    } else if (defaultOpenSidebar === "close") {
      setHeaderToggle(false);
      setheaderNavManu(true);
    }
  }, []);

  const headerTogglehandle = () => {
    setHeaderToggle(!headerToggle);
    setheaderNavManu(!headerNavManu);
    if (headerToggle === true) {
      localStorage.setItem("defaultOpenSidebar", "close");
    }
    if (headerToggle === false) {
      localStorage.setItem("defaultOpenSidebar", "open");
    }
  };
  var mainBody = document.getElementById("mainBody");
  useEffect(() => {
    window.innerWidth >= 768 &&
      (headerToggle
        ? mainBody.classList.add("mainBody")
        : mainBody.classList.remove("mainBody"));
    if (document.getElementById("header") !== null) {
      headerToggle &&
        document.getElementById("header").classList.add("mainBody");
      headerToggle !== true &&
        document.getElementById("header").classList.remove("mainBody");
    }
  }, [mainBody.classList, headerToggle]);

  const updateActive = () => {
    setRender(!render);
  };
  const logoutHandle = () => {
    Swal.fire({
      icon: "warning",
      title: "Logout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("logout Success", "", "success");
        localStorage.removeItem("authToken");
        navigate("/login");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className={sidebar === false && "d-none"}>
      <header className="header mb-4 dropdown" id="header">
        <div
          onClick={headerTogglehandle}
          className="header_toggle"
          id="header-toggle"
        >
          {headerNavManu ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faX} />
          )}{" "}
        </div>
        <div
          className="d-flex align-items-center dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <span className="header_img">
            {" "}
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/api/user/img/${
                userData && userData.photo
              }`}
              class="userImg"
              alt=""
            />{" "}
          </span>{" "}
          <span className="ms-1">
            {userData && (
              <>
                {userData.surname} {userData.name}
              </>
            )}
          </span>{" "}
        </div>

        <ul
          className="dropdown-menu dropdown-menu-end"
          style={{ width: "auto", padding: "0, 2rem" }}
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>

          <li className="dropdown-item" onClick={logoutHandle}>
            Log Out
          </li>
        </ul>
      </header>
      <div className="manubar">
        <div className={`l-navbar ${headerToggle ? "show" : ""}`} id="nav-bar">
          <nav className="nav">
            <div>
              {" "}
              <a
                href="#"
                className="sidebarHeader"
                style={{
                  justifyContent: headerToggle ? "center" : "left",
                  width: headerToggle ? "100%" : "50px",
                }}
              >
                <img
                  src={headerToggle ? logo : logo2}
                  className={headerToggle ? "logoSidebar" : "logoSidebarClosed"}
                  alt="db logo"
                />
              </a>
              <a href="#" className="nav_logo">
                <i className="bx bx-layer nav_logo-icon"></i>{" "}
                <span className="nav_logo-name">Task manager</span>{" "}
              </a>
              <div className="nav_list">
                <Link
                  onClick={updateActive}
                  to="/"
                  className={`nav_link ${pathname === "/" && "active"}`}
                >
                  <i className="bx bx-grid-alt nav_icon"></i>
                  <span className="nav_name">Dashboard</span>
                </Link>

                <Link
                  to="/projects"
                  onClick={updateActive}
                  className={`nav_link ${pathname === "/projects" && "active"}`}
                >
                  <FontAwesomeIcon icon={faTableList} />
                  <span className="nav_name">Projects</span>
                </Link>

                <Link
                  to="/users"
                  onClick={updateActive}
                  className={`nav_link ${pathname === "/users" && "active"}`}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="nav_name">Users</span>
                </Link>

                <Link
                  to="/clients"
                  onClick={updateActive}
                  className={`nav_link ${pathname === "/clients" && "active"}`}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="nav_name">Clients</span>
                </Link>

                <Link
                  onClick={updateActive}
                  to="/profile"
                  className={`nav_link ${pathname === "/profile" && "active"}`}
                >
                  <FontAwesomeIcon icon={faGear} />
                  <span className="nav_name">Profile</span>
                </Link>
                <Link onClick={logoutHandle} to="#" className={`nav_link `}>
                  <FontAwesomeIcon icon={faFileInvoice} />
                  <span className="nav_name">Logout</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
