import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import DonationForm from './components/DonationForm';
import DonationRecord from './components/DonationRecord';

/*
Donation input Form: Create a form where users can input details of a donation. 
  Fields to include: donor's name, type of donation(money, food, clothing, etc.), quantity or amount donated, and the date of the donation.
Donation List: Display a list of recorded donations with their details. Include way to edit or delete a donation from the list.
*/

function App() {
  const [donationList, setDonationList] = useState([]);

  const handleSubmitForm = (formData) => {
    setDonationList([...donationList, formData]);
  }

  const handleDeleteRow = (i) => {
    setDonationList(
      donationList.filter((_, index) => index !== i)
    );
  }


  return (
    <div>
      <DonationForm onSubmit={handleSubmitForm}  />
      <DonationRecord 
        donationList={donationList} 
        onDelete={handleDeleteRow}
        />
    </div>
  )
}

export default App;
