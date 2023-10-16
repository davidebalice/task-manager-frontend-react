import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "../../../components/Modal/EditModal";
import Loading from "../../../components/loading";

const Comments = ({
  comments,
  taskId,
  projectId,
  onUpdateComments,
  updateComments,
}) => {
  const token = localStorage.getItem("authToken");
  const [add, setAdd] = useState(false);
  const [editData, setEditData] = useState({ show: false, text: "", id: "" });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    comment: "",
    owner: "",
    task_id: taskId,
    project_id: projectId,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      task_id: taskId,
      project_id: projectId,
    });
    setLoading(false);
  }, [taskId, projectId]);

  function handleUpdateComments(newComments) {
    onUpdateComments(newComments);
  }

  function removeComment(id) {
    Swal.fire({
      title: "Sei sicuro?",
      text: "Questa azione non può essere annullata!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sì, rimuovi!",
      cancelButtonText: "No, annulla",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            process.env.REACT_APP_API_BASE_URL + "/api/delete/comment/",
            { id: id, task_id: taskId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response.data.comments");
            console.log(response.data.comments);
            /*
            const owner = data.owner;
            setFormData({
              ...formData,
              owner: owner,
            });
    */
            handleUpdateComments(response.data.comments);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }

  const openEditModal = (text, id) => {
    setEditData({ show: true, text, id });
  };

  const closeEditModal = () => {
    setEditData(false, null, null);
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/api/add/comment/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response.data.comments");
        console.log(response.data.comments);

        setFormData({
          ...formData,
          comment: "",
        });

        handleUpdateComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id}>
                {comment.comment}
                <div
                  onClick={() => openEditModal(comment.comment, comment._id)}
                >
                  edit
                </div>
                <div onClick={() => removeComment(comment._id)}>remove</div>
              </div>
            ))
          ) : (
            <div>No comments</div>
          )}
          <EditModal
            show={editData.show}
            closeEditModal={closeEditModal}
            editData={editData}
            updateUrl="/api/update/comment"
            onUpdateActivities={handleUpdateComments}
            type="comments"
          />
          <div>
            <label for="name">
              <b>Add comment</b>
            </label>
            <form>
              <textarea
                type="text"
                className="form-control"
                name="comment"
                required
                value={formData.comment}
                onChange={handleInput}
              ></textarea>
              <button
                onClick={submitForm}
                className="btn btn-primary btn-sm mt-3"
              >
                Add project
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Comments;
