const ButtonTask = ({ setTab }) => {
  return (
    <>
      <div className="mb-2 my-3">
        <button
          type="button"
          className={`btn mt-2 btn-outline-primary btn-sm mx-1`}
          onClick={() => setTab("activities")}
        >
          Activities
        </button>

        <button
          type="button"
          className={`btn mt-2 btn-outline-primary btn-sm mx-1`}
          onClick={() => setTab("comments")}
        >
          Comments
        </button>

        <button
          type="button"
          className={`btn mt-2 btn-outline-primary btn-sm mx-1`}
          onClick={() => setTab("file")}
        >
          File
        </button>

        <button
          type="button"
          className={`btn mt-2 btn-outline-primary btn-sm mx-1`}
          onClick={() => setTab("screenshots")}
        >
          Screenshots
        </button>
      </div>
    </>
  );
};

export default ButtonTask;
