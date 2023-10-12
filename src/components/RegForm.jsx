import React, { useState } from "react";
import "./Form.css";
import { db } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";

function RegForm() {
  //1
  const [FirstName, setFirstname] = useState("");
  const [LastName, setlastName] = useState("");

  const [Email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [Country, setCountry] = useState("");

  //2

  async function buttonsubmit(e) {
    e.preventDefault();

    alert("clicked");

    try {
      const docRef = await addDoc(collection(db, "users"), {
        fname: FirstName,
        lname: LastName,
        emailid: Email,
        Gender: gender,
        countryName: Country,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //3

  //   const countriesList = ["India", "US", "Pakistan", "Russia"];

  //4
  return (
    <div className="FormMain">
      <h1>My Form</h1>
      <form className="Form" onSubmit={buttonsubmit}>
      <div className="name-email-container">
  <label htmlFor="fname">
    First Name:
    <input
      type="text"
      name="firstName"
      id="fname"
      placeholder="First Name"
      value={FirstName}
      onChange={(e) => {
        setFirstname(e.target.value);
      }}
    />
  </label>
  <label htmlFor="lname">
    Last Name:
    <input
      type="text"
      name="lastName"
      id="lname"
      placeholder="Last Name"
      value={LastName}
      onChange={(e) => {
        setlastName(e.target.value);
      }}
    />
  </label>
  <label htmlFor="email">
    Email:
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      value={Email}
      onChange={(e) => {
        setEmail(e.target.value);
      }}
    />
  </label>
</div>

        <label htmlFor="">
          Gender :
          <div className="gendersblock">
            <label htmlFor="">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={() => {
                  setGender("Male");
                }}
              />
              Male
            </label>
            <label htmlFor="">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={() => setGender("Female")}
              />
              Female
            </label>
          </div>
        </label>
        <div className="dropdown">
          <label htmlFor="">
            Country :
            <select
              name="country"
              id="dropdown"
              value={Country}
              onChange={(e) => {
                console.log(e.target.value);
                setCountry(e.target.value);
              }}
            >
              <option value="">Country name</option>
              <option>India</option>
              <option>US</option>
            </select>
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
      {/* <DisplayData /> */}
    </div>
  );
}

export default RegForm;
