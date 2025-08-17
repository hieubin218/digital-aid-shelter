const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// File System from Node.js used for read/write files
const fs = require('fs');
const path = require('path');

// Create full file path
const filePath = path.join(__dirname, 'donationRecords.json');

// Because I use json file, there are two functions to manage json file (Read, Write)
const readJsonFile = () => {
    let data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Write or Delete data from JSON File
const updateJsonFile = (listOfDonation) => {
    fs.writeFileSync(filePath, JSON.stringify(listOfDonation, null, 2));
}

// Get a list of donation and display on the Table
app.get('/list-of-donations', (req, res) => {
    let donations = readJsonFile();
    res.json(donations);
});

// Add new donation into JSON File
app.post('/add-donation', (req, res) => {
    const donations = readJsonFile();
    console.log("Backend: ", req.body);
    const newDonation = { id: Math.random(), ...req.body };
    donations.push(newDonation);
    updateJsonFile(donations);
    res.status(201).json(newDonation);
});


const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

