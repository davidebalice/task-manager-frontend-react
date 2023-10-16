import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faListCheck,
  faTableList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ButtonTask = ({ setTab, tab }) => {
  return (
    <>
     <div className="buttonGroup borderBottom">
        <button
          type="button"
          className={`projectTab ${
            tab === "activities" ? "projectTabSelected" : ""
          }`}
          onClick={() => setTab("activities")}
        >
          Activities
        </button>

        <button
          type="button"
          className={`projectTab ${
            tab === "comments" ? "projectTabSelected" : ""
          }`}
          onClick={() => setTab("comments")}
        >
          Comments
        </button>

        <button
          type="button"
          className={`projectTab ${tab === "file" ? "projectTabSelected" : ""}`}
          onClick={() => setTab("file")}
        >
          File
        </button>

        <button
          type="button"
          className={`projectTab ${
            tab === "screenshots" ? "projectTabSelected" : ""
          }`}
          onClick={() => setTab("screenshots")}
        >
          Screenshots
        </button>
      </div>
    </>
  );
};

export default ButtonTask;
