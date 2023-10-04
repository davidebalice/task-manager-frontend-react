import { Link, useLocation } from "react-router-dom";

const ButtonGroup = ({ projectId }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="mb-2 my-3">
        {currentPath !== `/project/${projectId}` && (
          <Link to={`/project/${projectId}`}>
            <button
              type="button"
              className={`btn mt-2 btn-outline-primary btn-sm mx-1`}
            >
              Project
            </button>
          </Link>
        )}
        {currentPath !== `/project/tasks/${projectId}` && (
          <Link to={`/project/tasks/${projectId}`}>
            <button
              type="button"
              className={`btn mt-2 btn-outline-primary btn-sm mx-1`}
            >
              Tasks
            </button>
          </Link>
        )}
        {currentPath !== `/project/members/${projectId}` && (
          <Link to={`/project/members/${projectId}`}>
            <button
              type="button"
              className={`btn mt-2 btn-outline-primary btn-sm mx-1`}
            >
              Members
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ButtonGroup;
