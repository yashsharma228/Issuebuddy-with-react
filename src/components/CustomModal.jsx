import React from "react";
import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);

  const singleUser = allusers.filter((ele) => ele.id === id);
  console.log("singleuser", singleUser);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h2>{singleUser[0].FullName}</h2>
        <h3>{singleUser[0].Stream}</h3>
        <h4>{singleUser[0].RollNumber}</h4>
        <p>{singleUser[0].Problem}</p>
      </div>
    </div>
  );
};

export default CustomModal;


