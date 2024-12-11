import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api')
            .then((response) => response.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <div>
            <h1>Frontend is set up!</h1>
            <p>Backend says: {message}</p>
        </div>
    );
}

export default App;
