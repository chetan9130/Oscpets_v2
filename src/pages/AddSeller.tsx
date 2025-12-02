import React, { useState } from 'react';
import axios from 'axios';

const AddSeller = () => {
  const [seller, setSeller] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    await axios.post('http://localhost:5000/api/admin/add-seller', seller);
    alert("Seller added!");
  };

  return (
    <div>
      <h3>Add Seller</h3>
      <input placeholder="Name" onChange={(e) => setSeller({ ...seller, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setSeller({ ...seller, email: e.target.value })} />
      <input placeholder="Password" onChange={(e) => setSeller({ ...seller, password: e.target.value })} />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default AddSeller;
