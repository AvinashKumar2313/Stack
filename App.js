// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png'; // Import your logo image

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const jsonData = JSON.parse(input); // Parse the JSON input

            // Send POST request to the new backend endpoint /bfhl
            const res = await axios.post('http://localhost:3000/bfhl', jsonData);

            // Handle the response
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    return (
        <div>
            <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
            <h1>ABCD123</h1>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder='{"data":["M","1","334","4","B","Z","a"]}' 
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <p>Response: {JSON.stringify(response)}</p>
                </div>
            )}
        </div>
    );
};

export default App;
