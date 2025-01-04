import React from 'react';
import './timeline.css';

import eventsData from './events.json'; 
import eventImage from '../../resource/89982-original.jpg';
const Timeline = () => {
  const groupEventsByDate = () => {
    const grouped = {};
    eventsData.forEach(event => {
      if (!grouped[event.date]) {
        grouped[event.date] = [];
      }
      grouped[event.date].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate();

  return (
    <div className="timeline-container">
    <div className="timeline">
      {Object.keys(groupedEvents).map(date => (
        <div key={date} className="date-group">
          <h3>{date}</h3>
          <div className="events-row">
          {groupedEvents[date].map(event => (
            <div key={event.id} className="event">
            <img src={eventImage} alt={event.title} className="event-image" />
            <h4>{event.title}</h4>
          </div>          
          ))}
        </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Timeline;
