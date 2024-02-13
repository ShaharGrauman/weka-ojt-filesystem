import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { ModallBody,ModallFooter,ModallHeader } from './ModalComponent';
import { fileDeletion } from '../Dal/data.js';

const DeleteModal = ({onClose,itemId,userId}) => {
    const [show, setShow] = useState(true);

const handleClose = () => {
    setShow(false);
    onClose();}

const handledelete = () => {
    fileDeletion(userId,itemId);
    handleClose();
    onClose();
};

return (
    <div>

        <Modal show={show} onHide={handleClose}>
            <ModallHeader closeModal={handleClose} />
            <ModallBody />
            <ModallFooter
                closeModal={handleClose}
                handleAction={handledelete}
                actionText="Delete"
            />
        </Modal>
    </div>
);
};

export default DeleteModal;

