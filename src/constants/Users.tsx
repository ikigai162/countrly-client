import React, { useState, useEffect } from "react";
import { icons } from "../img/constants";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState<
    Array<{ username: string; rating: number }>
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const usersPerPage = 6;

  useEffect(() => {
    fetch("https://exciting-wonder-production.up.railway.app/country/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error at fetching ranking with status:${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ranking data", data);
        setUsers(data);
      })
      .catch((error) => console.error("Error at fetching data", error));
  }, []);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  const startIndex = currentPage * usersPerPage;
  const displayedUsers = sortedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleNextPage = () => {
    if (startIndex + usersPerPage < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Users Ranking</h2>
        <button className="sort" onClick={toggleSortOrder}>
          Sort by Rating ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      <div className="users-list">
        {displayedUsers.map((user, index) => (
          <div className="user-content" key={index}>
            <div className="user-name">
              <img className="user-img" src={icons.baby} alt="icon" />
              <p className="user-text">
                {user?.user?.username || "Unknown User"}
              </p>
            </div>
            <p className="user-rank">{user?.rating || "No Rating"}</p>
          </div>
        ))}
      </div>

      <div className="pagination-buttons">
        <button
          className="previous"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="next"
          onClick={handleNextPage}
          disabled={startIndex + usersPerPage >= users.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;