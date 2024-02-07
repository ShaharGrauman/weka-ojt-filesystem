import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { ModallBody,ModallFooter,ModallHeader } from './ModalComponent';


const LogoutModall = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    const handleLogout = () => {
        // Your logout logic goes here
        console.log("Logging out...");
        handleClose();
    };

    return (
        <div>

            <Modal show={show} onHide={handleClose}>
                <ModallHeader closeModal={handleClose} />
                <ModallBody />
                <ModallFooter
                    closeModal={handleClose}
                    handleAction={handleLogout}
                    actionText="Log out"
                />
            </Modal>
        </div>
    );
};

export default LogoutModall;
