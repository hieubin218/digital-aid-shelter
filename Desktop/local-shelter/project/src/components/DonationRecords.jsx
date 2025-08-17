import React, { useState } from 'react';

function DonationRecord({ donationList, onDelete, onUpdate }) {
    const [editingId, setEditingId] = useState(null);
    const [editDonation, setEditDonation] = useState({});

    const startEditing = (donation) => {
        setEditingId(donation.id);
        setEditDonation({ ...donation });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditDonation({});
    };

    const saveEditing = (id) => {
        onUpdate(id, editDonation);
        setEditingId(null);
        setEditDonation({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDonation((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
        <h2>Donation Record History</h2>
        {donationList.length === 0 ? (
            <p>No Record Found!</p>
        ) : (
            <table border="1">
            <thead>
                <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {donationList.map((donation, index) => (
                <tr key={donation.id}>
                    <td>
                    {editingId === donation.id ? (
                        <input
                        type="text"
                        name="donorName"
                        value={editDonation.donorName || ''}
                        onChange={handleChange}
                        />
                    ) : (
                        donation.donorName
                    )}
                    </td>
                    <td>
                    {editingId === donation.id ? (
                        <select
                        name="donationType"
                        value={editDonation.donationType || ''}
                        onChange={handleChange}
                        >
                        <option value="">Select...</option>
                        <option value="money">Money</option>
                        <option value="

    food">Food</option>
                        <option value="clothes">Clothes</option>
                        <option value="books">Books</option>
                        <option value="others">Others</option>
                        </select>
                    ) : donation.donationType === 'others' ? (
                        donation.otherType
                    ) : (
                        donation.donationType
                    )}
                    </td>
                    <td>
                    {editingId === donation.id ? (
                        <input
                        type="number"
                        name="donationQuantity"
                        value={editDonation.donationQuantity || ''}
                        onChange={handleChange}
                        />
                    ) : (
                        donation.donationQuantity
                    )}
                    </td>
                    <td>
                    {editingId === donation.id ? (
                        <input
                        type="date"
                        name="donationDate"
                        value={editDonation.donationDate || ''}
                        onChange={handleChange}
                        />
                    ) : (
                        donation.donationDate
                    )}
                    </td>
                    <td>
                    {editingId === donation.id ? (
                        <>
                        <button onClick={() => saveEditing(donation.id)}>Save</button>
                        <button onClick={cancelEditing}>Cancel</button>
                        </>
                    ) : (
                        <>
                        <button onClick={() => startEditing(donation)}>Edit</button>
                        <button onClick={() => onDelete(donation.id)}>Delete</button>
                        </>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
}

export default DonationRecord;