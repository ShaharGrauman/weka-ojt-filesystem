import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { ModallBody,ModallFooter,ModallHeader } from './ModalComponent';


const StoreModal = ({onClose}) => {
    const [show, setShow] = useState(true);

    const handleClose = () => {setShow(false);onClose();}

    const handlestore = () => {
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
                    handleAction={handlestore}
                    actionText="Store"
               />
            </Modal>
        </div>
    );
};

export default StoreModal;

