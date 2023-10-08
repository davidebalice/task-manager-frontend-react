import { Link } from "react-router-dom";
const notAuth = () => {
  return (
    <>
      <div className="container fluid">
        <div
          className="row justify-content-center align-items-center jumbotron w-100"
          style={{ height: "65vh" }}
        >
          <p className="notAuth">User not authenticated</p>
          
          <Link className="dropdown-item" to="/login">
          login
            </Link>
        </div>
      </div>
    </>
  );
};
export default notAuth;
