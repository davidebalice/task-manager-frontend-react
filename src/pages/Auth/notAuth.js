const notAuth = () => {
  return (
    <>
      <div className="container fluid">
        <div
          className="row justify-content-center align-items-center jumbotron w-100"
          style={{ height: "65vh" }}
        >
          <p className="notAuth">User not authenticated</p>
        </div>
      </div>
    </>
  );
};
export default notAuth;
