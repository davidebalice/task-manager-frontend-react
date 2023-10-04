import "./layout.css";
import "boxicons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Admin_icon from "../assets/photo/admin.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
  faListUl,
  faBuildingColumns,
  faIndent,
  faFileInvoice,
  faFileCode,
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
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default function Layouts() {
  const [plus, setPlus] = useState(true);
  const [plus2, setPlus2] = useState(true);
  const [plus3, setPlus3] = useState(true);
  const [plus4, setPlus4] = useState(true);
  const [plus5, setPlus5] = useState(true);
  const [plus6, setPlus6] = useState(true);
  const pathname = window.location.pathname;
  // const [pathName, setPathName] = useState('/')
  const [render, setRender] = useState(true);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [sidebar, setSidebar] = useState("");
  const [headerNavManu, setheaderNavManu] = useState(true);

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

  const headerTogglehandle = () => {
    setHeaderToggle(!headerToggle);
    setheaderNavManu(!headerNavManu);
  };
  var body_pd = document.getElementById("body-pd");
  useEffect(() => {
    window.innerWidth >= 768 &&
      (headerToggle
        ? body_pd.classList.add("body-pd")
        : body_pd.classList.remove("body-pd"));
    if (document.getElementById("header") !== null) {
      headerToggle &&
        document.getElementById("header").classList.add("body-pd");
      headerToggle !== true &&
        document.getElementById("header").classList.remove("body-pd");
    }
  }, [body_pd.classList, headerToggle]);

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
        window.location.href = "./login";
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
            <img src={Admin_icon} alt="admin icon" />{" "}
          </span>{" "}
          <span className="ms-1">Mobashir</span>{" "}
        </div>

        <ul
          className="dropdown-menu dropdown-menu-end"
          style={{ width: "auto", padding: "0, 2rem" }}
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <Link className="dropdown-item" to="/profileSetting">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/general-setting">
              Setting
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
              <a href="#" className="nav_logo">
                {" "}
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
                  <FontAwesomeIcon icon={faListUl} />
                  <span className="nav_name">Projects</span>
                </Link>

                <Link
                  onClick={updateActive}
                  to="/change-password"
                  className={`nav_link ${
                    pathname === "/change-password" && "active"
                  }`}
                >
                  <FontAwesomeIcon icon={faGear} />
                  <span className="nav_name">Change Password</span>
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
