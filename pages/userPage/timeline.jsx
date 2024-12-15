import React, { useState, useEffect } from 'react';
import './timeline.css';

const Timeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('./events.json', {
          method: 'GET',  // Tipul cererii
          headers: {
            'Content-Type': 'application/json',  
            'Accept': 'application/json'        
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();  
  }, []);

  const groupEventsByDate = () => {
    const grouped = {};
    events.forEach(event => {
      if (!grouped[event.date]) {
        grouped[event.date] = [];
      }
      grouped[event.date].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate();

  return (
    <div className="timeline">
      {Object.keys(groupedEvents).map(date => (
        <div key={date} className="date-group">
          <h3>{date}</h3>
          <ul>
            {groupedEvents[date].map(event => (
              <li key={event.id} className="event">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <small>{event.location}</small>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
