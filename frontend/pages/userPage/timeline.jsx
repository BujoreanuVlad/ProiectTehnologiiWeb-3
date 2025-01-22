import React, { useState, useEffect } from 'react';
import './timeline.css';
import ModalEveniment from './ModalEveniment.jsx'; 
import "./ModalEveniment.css";
import { getEvenimenteAll, getEvenimentId } from '../api.jsx';
import Cookies from 'universal-cookie';

const Timeline = ({ username, setEvenimenteInregistrate }) => {
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

	const cookies = new Cookies()
	const token = cookies.get("authToken")

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const events = await getEvenimenteAll(token); 
      setEventsData(events);
    } catch (error) {
      console.error("Eroare la încărcarea evenimentelor:", error);
    }
  };

  const fetchEventDetails = async (id) => {
    try {
      const eventDetails = await getEvenimentId(id, token); 
      setSelectedEvent(eventDetails.data); 
      setShowModal(true); 
    } catch (error) {
      console.error("Eroare la încărcarea detaliilor evenimentului:", error);
    }
  };

  const groupEventsByDate = () => {
    const grouped = {};
    eventsData.forEach(event => {
      const date = new Date(event.dataDeschidere).toLocaleDateString(); 
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });
    return grouped;
  };

  const sortedGroupedEvents = () => {
    const grouped = groupEventsByDate();
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b)); 
    return sortedDates.map(date => ({
      date,
      events: grouped[date]
    }));
  };

  const handleOpenModal = (event) => {
    fetchEventDetails(event.id); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="timeline-container">
      <div className="timeline">
        {sortedGroupedEvents().map(({ date, events }) => (
          <div key={date} className="date-group">
            <span>{date}</span>
            {events.map(event => (
              <div key={event.id} className="event" onClick={() => handleOpenModal(event)} style={{ cursor: 'pointer' }}>
                <div className="event-content">
                  <img 
                    src={event.imagineEveniment || 'fallback-image.jpg'} 
                    alt={event.nume} 
                    className="event-image" 
                  />
                  <h4>{event.nume}</h4>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal Eveniment */}
      {selectedEvent && (
        <ModalEveniment 
          show={showModal} 
          onClose={handleCloseModal} 
          eveniment={selectedEvent} 
		  username={username}
		  setEvenimenteInregistrate={setEvenimenteInregistrate}
        />
      )}
    </div>
  );
};

export default Timeline;
