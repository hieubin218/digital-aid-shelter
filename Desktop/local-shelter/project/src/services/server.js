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

// Modify existing donation information
app.put("/update-donation/:id", (request, response) => {
    let listOfDonation = readJsonFile();
    let selectedDonationID = Number(request.params.id);
    
    const updatedDonation = request.body;


    // Find Index of donation object in JSON (Order Matter)
    const index = listOfDonation.findIndex(donationObj => donationObj.id === selectedDonationID);

    // Replace updated object to the index above (Order Matter)
    listOfDonation[index] = {...listOfDonation[index], ...updatedDonation};
    updateJsonFile(listOfDonation);

    response.json({
        message: `BACKEND: Update OK!`
    })
})


// Delete selected donation information
app.delete('/delete-donation/:id', (req, res) => {
    const listOfDonation = readJsonFile();

    // Get id from selected donation
    let donationID = Number(req.params.id);
    console.log("donationID: ", req);

    // Iterate list of donations to find if any match donationID
    let NewDonations = listOfDonation.filter(donation => donation.id !== donationID);

    if (NewDonations.length === listOfDonation.length) {
        return res.status(404).json({
            message: "Donation not found!"
        });
    }

    // If donation exists, update the list of donations
    updateJsonFile(NewDonations);
    res.json({
        message: `Donation ID: ${donationID} has been successfully deleted`
    })
});


const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

