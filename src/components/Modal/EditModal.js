import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Context } from "../../context/UserContext";
import Swal from "sweetalert2";

const EditModal = ({
  editData,
  closeEditModal,
  updateUrl,
  onUpdateActivities,
  type,
}) => {
  const token = localStorage.getItem("authToken");
  const [text, setText] = useState("");
  const { userData, demo } = useContext(Context);

  const handleUpdateActivities = (newActivities) => {
    onUpdateActivities(newActivities);
  };

  const submitForm = (e) => {
    e.preventDefault();
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
          `${process.env.REACT_APP_API_BASE_URL}${updateUrl}`,
          { id: editData.id, name: text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          if (type === "activities") {
            console.log(response.data.activities);
            handleUpdateActivities(response.data.activities);
          } else if (type === "comments") {
            console.log(response.data.comments);
            handleUpdateActivities(response.data.comments);
          } else if (type === "files") {
            console.log(response.data.files);
            handleUpdateActivities(response.data.files);
          }

          closeEditModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Modal show={editData.show} centered>
        <Modal.Header>
        
        </Modal.Header>
        <Modal.Body>
          <Form>
            <textarea name="text" className="form-control" onChange={handleTextChange}>
              {editData.text}
            </textarea>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" className="btn btn-sm" onClick={submitForm}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
