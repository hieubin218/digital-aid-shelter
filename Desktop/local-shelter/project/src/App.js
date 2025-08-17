import React, { useEffect, useState } from 'react';
import DonationForm from './components/DonationForm';
import DonationRecord from './components/DonationRecords';

/*
Donation input Form: Create a form where users can input details of a donation. 
  Fields to include: donor's name, type of donation(money, food, clothing, etc.), quantity or amount donated, and the date of the donation.
Donation List: Display a list of recorded donations with their details. Include way to edit or delete a donation from the list.
*/

function App() {
  const [donationList, setDonationList] = useState([]);

  // Front-end: Retrieve a list of donations through API
  useEffect(() => {
    fetch("http://localhost:5001/list-of-donations")
      .then(res => res.json())
      .then(data => setDonationList(data))
      .catch(err => console.error(err));
  }, []);

  // FRONT-END: Send new Submitted Form to the back-end
  const handleSubmitForm = (submitNewForm) => {
    fetch("http://localhost:5001/add-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitNewForm)
    })
      .then(res => res.json())
      .then(newDonation => {setDonationList([...donationList, newDonation])
      })
      .catch(err => console.error(err));
  };

  // FRONT-END: Remove/Delete selected donation info in the Back-end
  const handleDeleteRow = (id) => {
    fetch(`http://localhost:5001/delete-donation/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(response => {
        console.log("Backend:", response.message);

        // Update frontend state only after backend confirms deletion
        setDonationList(donationList.filter(donation => donation.id !== id));
      })
      .catch(err => console.error("Unable to delete:", err));
  };

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
