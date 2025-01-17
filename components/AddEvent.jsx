import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getGrupEvenimenteAll } from "../pages/api.jsx";
import "./AddEventGroupModal.css";

const AddEventModal = ({ show, handleClose, handleAddEvent, groups }) => {
    const [grupuriEvenimente, setGrupuriEvenimente] = useState([]);
    const [eventData, setEventData] = useState({
        name: '',
        openDate: '',
        interval: 0,
        availableSeats: 0,
        accessCode: '',
        status: 'OPEN',
        groupId: '',
        imageUrl: '',
    });
    const fetchGrupuriEvenimente = async () => {
        try {
            const response = await getGrupEvenimenteAll();
            if (response.status === 200) {
                setGrupuriEvenimente(response.data);
                console.log("Add Event ", response.data); // Log after data is updated
            }
        } catch (error) {
            console.error("Error fetching event groups: ", error);
        }
    };

    useEffect(() => {
        if (show) {
            fetchGrupuriEvenimente();
        }
    }, [show]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        handleAddEvent(eventData);
        setEventData({
            name: '',
            openDate: '',
            interval: 0,
            availableSeats: 0,
            accessCode: '',
            status: 'OPEN',
            groupId: '',
            imageUrl: '',
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>

        <Modal.Header closeButton>
                <Modal.Title>Adaugă Eveniment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="eventName">
                        <Form.Label>Nume</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introdu numele evenimentului"
                            name="name"
                            value={eventData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventOpenDate">
                        <Form.Label>Data Deschidere</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="openDate"
                            value={eventData.openDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventInterval">
                        <Form.Label>Interval</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Introdu intervalul"
                            name="interval"
                            value={eventData.interval}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventAvailableSeats">
                        <Form.Label>Nr Locuri Disponibile</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Introdu numărul de locuri disponibile"
                            name="availableSeats"
                            value={eventData.availableSeats}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventAccessCode">
                        <Form.Label>Cod Acces</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introdu codul de acces"
                            name="accessCode"
                            value={eventData.accessCode}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventStatus">
                        <Form.Label>Stare</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={eventData.status}
                            onChange={handleChange}
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eventGroupId">
                        <Form.Label>Grup</Form.Label>
                        <Form.Control
                            as="select"
                            name="groupId"
                            value={eventData.groupId}
                            onChange={handleChange}
                        >
                            <option value="">Selectează un grup</option>
                            {grupuriEvenimente.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.nume}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eventImageUrl">
                        <Form.Label>Imagine Eveniment</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introdu URL-ul imaginii"
                            name="imageUrl"
                            value={eventData.imageUrl}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Închide
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Adaugă Eveniment
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEventModal;
