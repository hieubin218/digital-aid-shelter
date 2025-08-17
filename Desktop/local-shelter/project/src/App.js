import React, { useEffect, useState } from 'react';
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

  // Use React Hook to check if a donation object is changed (delete/edit) from the list or not
  useEffect(() => {
    console.log(donationList);
  }, [donationList]);


  const handleEditDonation = (id, updatedData) => {
    setDonationList(
      donationList.map((donation) =>
        donation.id === id ? { ...updatedData, id } : donation
      )
    );
  };

  return (
    <div>
      <DonationForm onSubmit={handleSubmitForm}  />
      <DonationRecord 
        donationList={donationList} 
        onDelete={handleDeleteRow}
        onUpdate={handleEditDonation}
        />
    </div>
  )
}

export default App;
