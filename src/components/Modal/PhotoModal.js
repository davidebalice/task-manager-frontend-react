import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const PhotoModal = ({ show, imgUrl, title, closePhotoModal }) => {
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title style={{fontSize:'14px'}}>{title}</Modal.Title>
          <Button variant="secondary" onClick={closePhotoModal}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <img src={imgUrl} alt="" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoModal;
