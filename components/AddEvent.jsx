import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addEveniment, getGrupEvenimenteAll } from '../pages/api.jsx'; // Importă funcțiile API
import './AddEventGroupModal.css';
import imageCompression from 'browser-image-compression';


const AddEvent = ({ show, onClose }) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventInterval, setEventInterval] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [image, setImage] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(''); // Grup selectat
    const [groups, setGroups] = useState([]); // Lista grupurilor
    const [errors, setErrors] = useState({});
    const [loadingGroups, setLoadingGroups] = useState(false); // Loader pentru grupuri

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoadingGroups(true);
                const response = await getGrupEvenimenteAll();
                setGroups(response.data); // Asumăm că răspunsul conține o listă de grupuri
            } catch (error) {
                console.error('Eroare la încărcarea grupurilor:', error);
                toast.error('Nu s-au putut încărca grupurile. Te rugăm să reîncerci mai târziu.');
            } finally {
                setLoadingGroups(false);
            }
        };

        fetchGroups();
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 1, // Dimensiunea maximă a fișierului (MB)
                maxWidthOrHeight: 1024, // Dimensiunea maximă în pixeli
            };
            try {
                const compressedFile = await imageCompression(file, options);
                const base64String = await imageCompression.getDataUrlFromFile(compressedFile);
                setImage(base64String); // Salvează stringul Base64 în state
            } catch (error) {
                console.error('Eroare la compresia imaginii:', error);
            }
        }
    };
    

    const validateForm = () => {
        const errObj = {};

        if (!eventName.trim() || !/^[a-zA-Z\s]+$/.test(eventName)) {
            errObj.eventName = "Numele evenimentului trebuie să conțină doar litere și spații!";
        }
        if (!eventDate) {
            errObj.eventDate = "Data evenimentului este obligatorie!";
        }
        if (!eventLocation.trim()) {
            errObj.eventLocation = "Locația evenimentului este obligatorie!";
        }
        if (eventInterval <= 0 || isNaN(eventInterval)) {
            errObj.eventInterval = "Intervalul trebuie să fie un număr pozitiv!";
        }
        if (availableSeats <= 0 || isNaN(availableSeats)) {
            errObj.availableSeats = "Numărul de locuri disponibile trebuie să fie un număr pozitiv!";
        }
        if (!selectedGroup) {
            errObj.selectedGroup = "Trebuie să selectezi un grup!";
        }

        setErrors(errObj);
        return Object.keys(errObj).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const eventData = {
            nume: eventName,
            dataDeschidere: eventDate,
            interval: parseInt(eventInterval, 10),
            nrLocuriDisponibile: parseInt(availableSeats, 10),
            stare: 'CLOSED', // Valoarea implicită
            idGrup: selectedGroup,
            imagineEveniment: image || '',
            descriereEveniment: eventDescription,
        };

        try {
            await addEveniment(eventData);
            toast.success('Evenimentul a fost adăugat cu succes!');

            // Resetare câmpuri
            setEventName('');
            setEventDate('');
            setEventLocation('');
            setEventInterval('');
            setAvailableSeats('');
            setEventDescription('');
            setImage(null);
            setSelectedGroup('');
            onClose();
        } catch (error) {
            console.error('Eroare la adăugarea evenimentului:', error);
            toast.error('A apărut o eroare la adăugarea evenimentului. Te rugăm să încerci din nou.');
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
                        {errors.eventName && <small className="error">{errors.eventName}</small>}
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
                        {errors.eventDate && <small className="error">{errors.eventDate}</small>}
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
                        {errors.eventLocation && <small className="error">{errors.eventLocation}</small>}
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
                        {errors.eventInterval && <small className="error">{errors.eventInterval}</small>}
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
                        {errors.availableSeats && <small className="error">{errors.availableSeats}</small>}
                    </div>
                    <div className="input-box">
                        <label htmlFor="groupSelect">Grup Evenimente</label>
                        {loadingGroups ? (
                            <p>Se încarcă grupurile...</p>
                        ) : (
                            <select
                                id="groupSelect"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                required
                            >
                                <option value="">Selectează un grup</option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.nume}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors.selectedGroup && <small className="error">{errors.selectedGroup}</small>}
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
                            required
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
