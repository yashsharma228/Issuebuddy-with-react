import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users...",users);
    dispatch(createUser(users));
    navigate("/read");
  };
   
  return (
    <div>
      <h1 className="my-2">Fill the Information</h1>
      <form className="w-50 mx-auto my-5 " onSubmit={handleSubmit}>
        <div class="mb-3">
          <label class="form-label">
            Full Name
          </label>
          <input
          type="text"
            class="form-control"
            name="FullName"
            onChange={getUserData}
            required
            
          />
        </div>

        <div class="mb-3">
          <label class="form-label">
            Stream
          </label>
          <input
          type="text"
            class="form-control"
            name="Stream"
            onChange={getUserData}
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">
            Roll Number
          </label>
          <input
            type="Number"
            name="RollNumber"
            onChange={getUserData}
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">
            Problem
          </label>
        <textarea
            type="text"
            class="form-control"
            name="Problem"
            onChange={getUserData}
            id="exampleFormControlTextarea1"
            rows="5"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <input type="checkbox" class="form-check-input" style={{marginRight:"5px"}} required />
          <label class="form-check-label" for="exampleCheck1">
            Valid Reason
          </label>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;

