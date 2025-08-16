import React, { useState } from 'react';

function DonationRecord({donationList, onDelete}) {

    return (
        <div>
            <h2>Donation Record History</h2>
            {
                donationList.length === 0 ? 
                (<p>No Record Found!</p>) : (
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donationList.map((donation, index) => (
                                    <tr key={index}>
                                        <td>{donation.donorName}</td>
                                        <td>{donation.donationType}</td>
                                        <td>{donation.donationQuantity}</td>
                                        <td>{donation.donationDate}</td>
                                        <td>
                                            <button>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => onDelete(index)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )

}


export default DonationRecord;