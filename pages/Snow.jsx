import React, { useEffect } from 'react';

export default function Snowfall() {
    useEffect(() => {
        const snowContainer = document.createElement('div');
        snowContainer.id = 'snow-container';
        document.body.appendChild(snowContainer);

        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = '❄'; 

            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; 

            snowContainer.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, 5000); 
        };

        const interval = setInterval(createSnowflake, 200);

        return () => clearInterval(interval); 
    }, []);

    return null;
}
