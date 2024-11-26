import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState();

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((ele) => ele.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log("updated data", updateData);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input
            type="text"
            name="FullName"
            class="form-control"
            value={updateData && updateData.FullName}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Stream</label>
          <input
            type="text"
            name="Stream"
            class="form-control"
            value={updateData && updateData.Stream}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Roll Number</label>
          <input
            type="number"
            name="RollNumber"
            class="form-control"
            value={updateData && updateData.RollNumber}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Problem</label>
          <textarea
            name="Problem"
            class="form-control"
            rows="5"
            value={updateData && updateData.Problem} 
            onChange={newData} 
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;



