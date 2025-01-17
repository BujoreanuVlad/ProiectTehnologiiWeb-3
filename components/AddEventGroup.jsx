import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./AddEventGroupModal.css";

const AddEventGroupModal = ({ show, handleClose, handleAddGroup }) => {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = () => {
        handleAddGroup({ name: groupName });
        setGroupName('');
        handleClose();
    };
    useEffect(() => {
        if (show) {
            console.log("");
        }
    }, [show]);
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered >

        <Modal.Header closeButton>
                <Modal.Title>Adaugă Grup de Evenimente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="groupName">
                        <Form.Label>Nume Grup</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introdu numele grupului"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="footer">
                <Button variant="secondary" onClick={handleClose}>
                    Închide
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Adaugă Grup
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEventGroupModal;
