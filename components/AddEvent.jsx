import React, { useState } from 'react';
import './AddEventGroupModal.css';

const AddEvent = ({ show, onClose, onAddEvent }) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventInterval, setEventInterval] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventName.trim() !== '' && eventDate && eventLocation.trim() !== '') {
            const eventData = {
                name: eventName,
                date: eventDate,
                location: eventLocation,
                interval: eventInterval,
                availableSeats: availableSeats,
                description: eventDescription,
                image: image,
            };
            onAddEvent(eventData);
            setEventName('');
            setEventDate('');
            setEventLocation('');
            setEventInterval('');
            setAvailableSeats('');
            setEventDescription('');
            setImage(null);
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="custom-modal">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2>Adaugă Eveniment</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label htmlFor="eventName">Nume Eveniment</label>
                        <input
                            type="text"
                            id="eventName"
                            placeholder="Introdu numele evenimentului"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="eventDate">Data și Ora Evenimentului</label>
                        <input
                            type="datetime-local"
                            id="eventDate"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="eventLocation">Locația Evenimentului</label>
                        <input
                            type="text"
                            id="eventLocation"
                            placeholder="Introdu locația evenimentului"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="eventInterval">Interval Eveniment (minute)</label>
                        <input
                            type="number"
                            id="eventInterval"
                            placeholder="Introdu intervalul în minute"
                            value={eventInterval}
                            onChange={(e) => setEventInterval(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="availableSeats">Număr Locuri Disponibile</label>
                        <input
                            type="number"
                            id="availableSeats"
                            placeholder="Introdu numărul de locuri disponibile"
                            value={availableSeats}
                            onChange={(e) => setAvailableSeats(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="image">Încarcă Imagine</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="eventDescription">Descriere Eveniment</label>
                        <textarea
                            id="eventDescription"
                            placeholder="Introdu descrierea evenimentului"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="add-event-btn">
                            Adaugă Eveniment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
