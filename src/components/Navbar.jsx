import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";
import "./Navbar.css";

const Navbar = () => {
  const allUsers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData, dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand">IssueBuddy</h1>

          {/* Toggle icons for small screens */}
          <div className="d-lg-none" onClick={toggleMenu}>
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </div>

          {/* Navbar links */}
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link active">
                  All Post ({allUsers.length})
                </Link>
              </li>
            </ul>

            {/* Search Input */}
            <form className="d-flex w-100 mt-2 mt-lg-0">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
