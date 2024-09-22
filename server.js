// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const upload = multer();

app.use(bodyParser.json());

// New endpoint for /bfhl
app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid data format" });
    }

    const userId = "john_doe_17091999";
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    const numbers = data.filter(item => !isNaN(item)).map(Number);
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets[lowercaseAlphabets.length - 1]]
        : [];

    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKB = 0;

    if (file_b64) {
        const buffer = Buffer.from(file_b64, 'base64');
        fileValid = true; // Simplified for example
        fileMimeType = 'image/png'; // Implement actual MIME type checking if needed
        fileSizeKB = (buffer.length / 1024).toFixed(2);
    }

    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    };

    res.json(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
