import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {share_file_with_user} from "../Dal/data.js"

const Share = ({ onClose ,selectedItem}) => {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  const handleEmailChange = (e) => setEmail(e.target.value);

   const handleShareFile =async() => {
    const response=await share_file_with_user(selectedItem,email)

    console.log(response)
    handleCloseModal();

  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShareFile}>
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Share;
