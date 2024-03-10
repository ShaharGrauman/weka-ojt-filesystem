import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { ModallBody,ModallFooter,ModallHeader } from './ModalComponent';
import {logout} from '../Dal/data.js'
import { Link, useNavigate } from "react-router-dom";


const LogoutModall = ({toggleLogoutModal}) => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        toggleLogoutModal();
    }

    const handleLogout = async () => {
        try {
            const result = await logout(); // Await the logout function
            navigate("/");
            handleClose();
        } catch (error) {
            console.error("Logout failed:", error);
        }
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
