import React, { useState } from "react";
import { db } from "../Firebase";
import { QuerySnapshot, collection, doc, getDoc } from "firebase/firestore";

function DisplayData() {
  const [data, setData] = useState([]);

  async function FetchData() {
    const docRef = doc(db, "users", true);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  return (
    <div className="displaydata">
      <h2>Stored Data : </h2>
      <ul>
        <li>SampleData</li>
      </ul>
      <button onClick={FetchData}>Show Data</button>
    </div>
  );
}

export default DisplayData;
