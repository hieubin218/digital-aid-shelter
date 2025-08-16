import React, { useState } from 'react';


function DonationForm({onSubmit}) {
    const [formData, setFormData] = useState({
        donorName: String,
        donationType: String,
        otherType: String,
        donationQuantity: Number,
        donationDate: String,
    });


    const submitForm = (e) => {
        e.preventDefault();
        onSubmit({...formData, id: Date.now()});
        setFormData({
            donorName: '',
            donationType: '',
            donationQuantity: '',
            otherType: '',
            donationDate: ''
        });
    };


    const handleChange = (e) => {
        const {name, value} = e.target;

        console.log("Change!");
        console.log("e: ", e.target.value);

        setFormData((prev) => ({...prev, [name]: value}));
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <h3>Donation Form</h3>

                
                <div>
                <label>Name of Donor</label>
                <input 
                    type='text' 
                    name='donorName' 
                    value={formData.donorName}
                    onChange={handleChange}
                    >
                </input>
                </div>

                <div>
                <label>Type of Donation</label>
                <select 
                    type='text' 
                    name='donationType' 
                    value={formData.donationType}
                    onChange={handleChange}
                    >
                    <option value="select">Select...</option>
                    <option value="money">Money</option>
                    <option value="food">Food</option>
                    <option value="clothes">Clothes</option>
                    <option value="books">Books</option>
                    <option value="others">Others</option>
                </select>
                </div>

                {/* */}
                {
                formData.donationType === 'others' && (
                    <div>
                    <label>If Others, please specify: </label>
                    <input
                        type='text'
                        name="otherType"
                        value={formData.otherType || ""}
                        onChange={handleChange}
                    >
                    </input>
                    </div>
                )
                }

                <div>
                <label>Donation Quantity</label>
                <input 
                    type='number' 
                    name='donationQuantity' 
                    value={formData.donationQuantity}
                    onChange={handleChange}
                    >
                </input>
                </div>

                <div>
                <label>Date of Donation</label>
                <input 
                    type='date' 
                    name='donationDate' 
                    value={formData.donationDate}
                    onChange={handleChange}
                    >
                </input>
                </div>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
export default DonationForm;