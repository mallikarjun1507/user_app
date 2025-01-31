import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const usersPerPage = 5;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`
      );
      setUsers(response.data);
      setHasMore(response.data.length === usersPerPage);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && (hasMore || newPage < page)) {
      setPage(newPage);
    }
  };
  console.log(users.length)
  return (
    <div className="container">
      <h1>User Profiles</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={`https://i.pravatar.cc/150?img=${user.id}`}
              alt="Profile"
              className="profile-pic"
            />
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        )}
        {hasMore && !loading && (
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        )}
      </div>

      {loading && <p className="loading-text">Loading users...</p>}
      {!hasMore && !loading && <p className="no-more-users">No more users to display.</p>}
    </div>
  );
}

export default App;
