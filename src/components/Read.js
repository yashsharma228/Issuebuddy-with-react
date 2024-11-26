import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

const Read = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container my-4">
      {showPopup && (
        <CustomModal id={id} setShowPopup={setShowPopup} />
      )}
      <h2 className="text-center mb-4">All Data</h2>
      <div className="row">
        {users && users.length > 0 ? (
          users
            .filter((ele) => {
              if (!searchData || searchData.trim().length === 0) return ele;
              return (
                ele.FullName &&
                ele.FullName.toLowerCase().includes(searchData.toLowerCase())
              );
            })
            .map((ele) => (
              <div key={ele.id} className="col-md-6 my-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Full Name: {ele.FullName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Stream: {ele.Stream}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Roll Number: {ele.RollNumber}
                    </h6>
                    <p className="card-text">Problem: {ele.Problem}</p>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => {
                        setId(ele.id);
                        setShowPopup(true);
                      }}
                    >
                      View
                    </button>
                    <Link
                      to={`/edit/${ele.id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => dispatch(deleteUser(ele.id))}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Read;




