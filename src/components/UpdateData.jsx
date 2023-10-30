import React, { useState } from "react";
import { db } from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./UpdateData.css";

function UpdateData({ docID, initialData }) {
  const [updatedData, setUpdatedData] = useState(initialData);

  async function handleUpdate() {
    const userRef = doc(db, "users", docID);

    await updateDoc(userRef, updatedData);

    alert("User details updated successfully");
  }

  function handleChange(e) {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  }

  return (
    <div className="update_data">
      <h2>Update User Details</h2>
      <form className="update-form" onSubmit={handleUpdate}>
        <label>
          First Name:
          <input
            type="text"
            name="fname"
            value={updatedData.fname}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lname"
            value={updatedData.lname}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="emailid"
            value={updatedData.emailid}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="Gender"
            value={updatedData.Gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Country:
          <select
            name="countryName"
            value={updatedData.countryName}
            onChange={handleChange}
          >
            <option value="">Select a country</option>
            <option value="India">India</option>
            <option value="US">US</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateData;
