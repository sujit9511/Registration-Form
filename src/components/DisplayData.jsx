import React, { useState } from "react";
import "../components/DisplayData.css";
import { db } from "../Firebase";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import UpdateData from "./UpdateData";

function DisplayData() {
  const [searchEmail, setSearchEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [docID, setDocID] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const docreff = collection(db, "users");
  const q = query(docreff, where("emailid", "==", searchEmail));

  function handleUpdateClick() {
    setShowUpdateForm(true);
  }

  async function SearchUser() {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setUserName("No Data");
      setUserLName("No Data");
      setUserGender("No Data");
      setUserCountry("No Data");
    } else {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setUserName(doc.data().fname);
        setUserLName(doc.data().lname);
        setUserGender(doc.data().Gender);
        setUserCountry(doc.data().countryName);
        setDocID(doc.id);
      });
    }
  }

  async function Deleteuser() {
    await deleteDoc(doc(db, "users", docID));
    alert("Deleted");
    window.location.reload();
  }

  return (
    <>
      <div className="search_and_display">
        <div className="searchdata">
          <label>
            Email ID :{" "}
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter email ID to search"
            />
          </label>
          <button className="search-btn" onClick={SearchUser}>
            Search
          </button>
        </div>
      </div>
      <div className="displaydata">
        {" "}
        <label htmlFor="">Name : {userName} </label>
        <label htmlFor="">Last Name : {userLName} </label>
        <label htmlFor="">Gender : {userGender} </label>
        <label htmlFor="">Country : {userCountry} </label>
        {userLName && (
          <button onClick={Deleteuser} className="delete_btn">
            {" "}
            Delete{" "}
          </button>
        )}{" "}
      </div>
      ... OR ...
      {userName && (
        <>
          <button onClick={handleUpdateClick} className="update_btn">
            {" "}
            Update{" "}
          </button>
          {showUpdateForm && (
            <UpdateData
              docID={docID}
              initialData={{
                fname: userName,
                lname: userLName,
                emailid: searchEmail,
                Gender: userGender,
                countryName: userCountry,
              }}
            />
          )}
        </>
      )}
    </>
  );
}

export default DisplayData;
