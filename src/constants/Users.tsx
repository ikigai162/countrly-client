import React, { useState, useEffect } from "react";
import { icons } from "../img/constants";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState<
    Array<{ username: string; rating: number }>
  >([]);
  const [currentPage, setCurrentPage] = useState(0); // Indexul paginii curente
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Ordinea sortării
  const usersPerPage = 6; // Numărul de utilizatori afișați pe pagină

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
        setUsers(data); // presupunând că `data` este un array de utilizatori
      })
      .catch((error) => console.error("Error at fetching data", error));
  }, []);

  // Sortează utilizatorii după rating în funcție de `sortOrder`
  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  // Calculează utilizatorii care vor fi afișați pe pagina curentă
  const startIndex = currentPage * usersPerPage;
  const displayedUsers = sortedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Funcții pentru schimbarea paginii
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

  // Funcția pentru schimbarea ordinii sortării
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

      {/* Butoane pentru navigare */}
      <div className="pagination-buttons">
        <button
          className="previous"
          onClick={handlePrevPage}
          disabled={currentPage === 0} // Dezactivează butonul dacă ești pe prima pagină
        >
          Previous
        </button>
        <button
          className="next"
          onClick={handleNextPage}
          disabled={startIndex + usersPerPage >= users.length} // Dezactivează butonul dacă nu mai sunt utilizatori
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;