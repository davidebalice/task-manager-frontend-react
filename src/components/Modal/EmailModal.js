import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const EmailModal = ({ modalData, closeEmailModal }) => {
  const token = localStorage.getItem("authToken");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    text: "",
    subject: "",
    email: modalData.email,
  });

  useEffect(() => {
    setMessage("");
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/send/email/user`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        //closeEmailModal();
        setMessage(response.data.message);
        setData({
          text: "",
          subject: "",
          email: modalData.email,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
      email: modalData.email,
    });
  };

  return (
    <>
      <Modal show={modalData.show} centered>
        message:{message}
        <br />
        text: {data.text}
        <br />
        email: {modalData.email}
        <br />
        email: {data.email}
        <br />
        subject: {data.subject}
        <br />
        <Modal.Header>
          <Modal.Title>Status</Modal.Title>

          <Button variant="secondary" onClick={closeEmailModal}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          {!message && (
            <Form>
              <input
                type="text"
                name="subject"
                onChange={handleInput}
                value={data.subject}
                required
              />
              <textarea name="text" onChange={handleInput} required>
                {data.text}
              </textarea>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEmailModal}>
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

export default EmailModal;
